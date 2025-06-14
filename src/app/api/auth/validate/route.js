// src/app/api/auth/validate/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { valid: false, message: 'No session token' },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('admin_sessions')
      .select(`
        id,
        expires_at,
        admin_users (
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
      return NextResponse.json(
        { valid: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: data.admin_users,
      expiresAt: data.expires_at
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { valid: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}