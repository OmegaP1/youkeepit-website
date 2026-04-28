// src/app/api/auth/validate/route.js
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const supabaseAdmin = createAdminClient();
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'No session token' },
        { status: 401 }
      );
    }

    // Validate session in database
    const { data, error } = await supabaseAdmin
      .from('admin_sessions')
      .select('user_id, expires_at')
      .eq('session_token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: data.user_id }
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { success: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}