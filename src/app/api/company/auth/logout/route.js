// src/app/api/company/auth/logout/route.js
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
    const sessionToken = request.cookies.get('company_session')?.value;

    if (sessionToken) {
      // Get session info for logging
      const { data: sessionData } = await supabaseAdmin
        .from('company_user_sessions')
        .select('user_id, company_id')
        .eq('session_token', sessionToken)
        .single();

      // Delete session
      await supabaseAdmin
        .from('company_user_sessions')
        .delete()
        .eq('session_token', sessionToken);

      // Log activity
      if (sessionData) {
        await supabaseAdmin.rpc('log_activity', {
          p_company_id: sessionData.company_id,
          p_user_id: sessionData.user_id,
          p_action: 'user_logout',
          p_entity_type: 'user',
          p_entity_id: sessionData.user_id,
          p_description: 'User logged out',
        });
      }
    }

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie':
            'company_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/company',
        },
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