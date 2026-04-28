// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const supabaseAdmin = createAdminClient();
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (sessionToken) {
      await supabaseAdmin
        .from('admin_sessions')
        .delete()
        .eq('session_token', sessionToken);
    }

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'admin_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
        }
      }
    );

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout error' },
      { status: 500 }
    );
  }
}