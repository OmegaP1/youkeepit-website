// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Call authenticate_admin RPC function
    const { data, error } = await supabaseAdmin.rpc('authenticate_admin', {
      p_username: username.trim(),
      p_password: password,
    });

    if (error) {
      console.error('Supabase RPC error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 500 }
      );
    }

    const result = typeof data === 'string' ? JSON.parse(data) : data;

    if (result.success) {
      const sessionToken = crypto.randomUUID() + '-' + Date.now();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Create session in database
      await supabaseAdmin.from('admin_sessions').insert({
        user_id: result.user.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'Unknown',
      });

      return NextResponse.json(
        {
          success: true,
          user: result.user,
          expiresAt: expiresAt.toISOString(),
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': `admin_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${24 * 60 * 60}; Path=/`,
          },
        }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication service error' },
      { status: 500 }
    );
  }
}