
// src/app/api/auth/create-session/route.js
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const supabaseAdmin = createAdminClient();
  try {
    const body = await request.json();
    const { userId, sessionToken, expiresAt, ipAddress, userAgent } = body;

    // Create session record
    const { data, error } = await supabaseAdmin
      .from('admin_sessions')
      .insert({
        user_id: userId,
        session_token: sessionToken,
        expires_at: expiresAt,
        ip_address: ipAddress,
        user_agent: userAgent
      })
      .select()
      .single();

    if (error) {
      console.error('Session creation error:', error);
      return NextResponse.json(
        { success: false, message: 'Session creation failed' },
        { status: 500 }
      );
    }

    // Log security event
    await supabaseAdmin
      .from('security_logs')
      .insert({
        event_type: 'LOGIN_SUCCESS',
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent,
        details: { session_id: data.id }
      });

    return NextResponse.json({ success: true, session: data });

  } catch (error) {
    console.error('Create session API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}