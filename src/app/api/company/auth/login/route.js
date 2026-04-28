// src/app/api/company/auth/login/route.js
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const supabaseAdmin = createAdminClient();
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.rpc('authenticate_company_user', {
      p_email: email.trim().toLowerCase(),
      p_password: password,
    });

    if (error) {
      console.error('Supabase RPC error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 500 }
      );
    }

    const result = data;

    if (result && result.success) {
      const sessionToken = crypto.randomUUID() + '-' + Date.now();
      const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

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
      }

      const cookieSettings =
        process.env.NODE_ENV === 'development'
          ? `company_session=${sessionToken}; HttpOnly; SameSite=Lax; Max-Age=${8 * 60 * 60}; Path=/`
          : `company_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${8 * 60 * 60}; Path=/`;

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
            'Set-Cookie': cookieSettings,
          },
        }
      );
    } else {
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