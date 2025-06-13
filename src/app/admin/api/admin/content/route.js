// src/app/api/admin/content/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/secure-supabase';
import { validateAdminSession, checkRateLimit } from '@/lib/auth-utils';

export async function GET(request) {
  try {
    // Public endpoint - no authentication required for reading
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    let query = supabaseAdmin
      .from('site_content')
      .select('*')
      .eq('is_active', true);

    if (section) {
      query = query.eq('section_name', section);
    }

    const { data, error } = await query.order('section_name');

    if (error) throw error;

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Content GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. Validate admin session
    const sessionToken = request.cookies.get('admin_session')?.value;
    const session = await validateAdminSession(sessionToken);
    
    if (!session.valid) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`admin_${clientIP}`, 20, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // 3. Parse and validate request body
    const body = await request.json();
    const { section_name, content_key, content_value, content_type = 'text' } = body;

    if (!section_name || !content_key || content_value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Sanitize inputs
    const sanitizedData = {
      section_name: section_name.trim().substring(0, 100),
      content_key: content_key.trim().substring(0, 100),
      content_value: typeof content_value === 'string' 
        ? content_value.trim() 
        : content_value,
      content_type: content_type.trim().substring(0, 50)
    };

    // 5. Update or insert content using service role
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .upsert(sanitizedData, {
        onConflict: 'section_name,content_key'
      })
      .select();

    if (error) throw error;

    // 6. Log the action
    await logSecurityEvent('CONTENT_UPDATED', {
      user_id: session.user.id,
      action: 'upsert',
      table: 'site_content',
      data: sanitizedData
    });

    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    console.error('Content POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // 1. Validate admin session with higher privileges
    const sessionToken = request.cookies.get('admin_session')?.value;
    const session = await validateAdminSession(sessionToken, 'super_admin');
    
    if (!session.valid) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // 2. Get content ID from search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid content ID' },
        { status: 400 }
      );
    }

    // 3. Delete content
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .delete()
      .eq('id', parseInt(id))
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }

    // 4. Log the action
    await logSecurityEvent('CONTENT_DELETED', {
      user_id: session.user.id,
      action: 'delete',
      table: 'site_content',
      deleted_id: id
    });

    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    console.error('Content DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}

// src/lib/auth-utils.js
import { supabaseAdmin } from './secure-supabase';

const rateLimitMap = new Map();

export async function validateAdminSession(sessionToken, requiredRole = 'admin') {
  if (!sessionToken) {
    return { valid: false, error: 'No session token' };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('admin_sessions')
      .select(`
        id,
        expires_at,
        admin_users!inner (
          id,
          username,
          email,
          full_name,
          role,
          is_active
        )
      `)
      .eq('session_token', sessionToken)
      .eq('admin_users.is_active', true)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return { valid: false, error: 'Invalid session' };
    }

    // Check role permissions
    const userRole = data.admin_users.role;
    const hasPermission = checkRolePermission(userRole, requiredRole);

    if (!hasPermission) {
      return { valid: false, error: 'Insufficient permissions' };
    }

    return {
      valid: true,
      user: data.admin_users,
      sessionId: data.id,
      expiresAt: data.expires_at
    };

  } catch (error) {
    console.error('Session validation error:', error);
    return { valid: false, error: 'Validation error' };
  }
}

export function checkRolePermission(userRole, requiredRole) {
  const roleHierarchy = {
    'super_admin': 2,
    'admin': 1
  };

  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

export function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }

  const requests = rateLimitMap.get(identifier);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Add current request
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);
  
  return true; // Request allowed
}

export async function logSecurityEvent(eventType, details = {}) {
  try {
    await supabaseAdmin
      .from('security_logs')
      .insert({
        event_type: eventType,
        user_id: details.user_id || null,
        ip_address: details.ip || null,
        user_agent: details.userAgent || null,
        details: details,
        severity: details.severity || 'LOW'
      });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}

// src/lib/secure-supabase.js (Updated)
import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

// Public client for read-only operations (client-side safe)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    enabled: false // Disable for security
  }
});

// Admin client for server-side operations (NEVER expose to client)
export const supabaseAdmin = typeof window === 'undefined' && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        enabled: false
      }
    })
  : null;

// Validate that admin client is only used server-side
if (typeof window !== 'undefined' && supabaseAdmin) {
  throw new Error('SECURITY ERROR: supabaseAdmin cannot be used on client-side');
}

// Client-side content fetcher (safe for public use)
export async function fetchPublicContent(section = null) {
  try {
    let query = supabase
      .from('site_content')
      .select('*')
      .eq('is_active', true);

    if (section) {
      query = query.eq('section_name', section);
    }

    const { data, error } = await query.order('section_name');

    if (error) throw error;
    return { success: true, data };

  } catch (error) {
    console.error('Public content fetch error:', error);
    return { success: false, data: [], error: error.message };
  }
}