// src/app/api/company/auth/login/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Login attempt for:', email); // Debug log

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call authenticate_company_user function
    const { data, error } = await supabaseAdmin.rpc('authenticate_company_user', {
      p_email: email.trim().toLowerCase(),
      p_password: password,
    });

    console.log('Supabase RPC response:', { data, error }); // Debug log

    if (error) {
      console.error('Supabase RPC error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 500 }
      );
    }

    // The data is already a JSON object, no need to parse
    const result = data;

    console.log('Parsed result:', result); // Debug log

    if (result && result.success) {
      // Generate session token
      const sessionToken = crypto.randomUUID() + '-' + Date.now();
      const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours

      // Create session in database
      const { error: sessionError } = await supabaseAdmin
        .from('company_user_sessions')
        .insert({
          user_id: result.user.id,
          company_id: result.user.company_id,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          ip_address: request.headers.get('x-forwarded-for') || 'unknown',
          user_agent: request.headers.get('user-agent') || 'Unknown',
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        return NextResponse.json(
          { success: false, message: 'Session creation failed' },
          { status: 500 }
        );
      }

      // Log activity (optional - skip if it fails)
      try {
        await supabaseAdmin.rpc('log_activity', {
          p_company_id: result.user.company_id,
          p_user_id: result.user.id,
          p_action: 'user_login',
          p_entity_type: 'user',
          p_entity_id: result.user.id,
          p_description: `User ${result.user.first_name} ${result.user.last_name} logged in`,
        });
      } catch (logError) {
        console.warn('Activity logging failed:', logError);
        // Don't fail login if activity logging fails
      }

      console.log('Login successful for:', result.user.email); // Debug log

      return NextResponse.json(
        {
          success: true,
          user: result.user,
          token: sessionToken,
          expiresAt: expiresAt.toISOString(),
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': `company_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${8 * 60 * 60}; Path=/company`,
          },
        }
      );
    } else {
      console.log('Authentication failed:', result?.message || 'Unknown error'); // Debug log
      return NextResponse.json(
        { success: false, message: result?.message || 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Company login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication service error' },
      { status: 500 }
    );
  }
}