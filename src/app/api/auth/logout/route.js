// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
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