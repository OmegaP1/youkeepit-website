// src/app/api/company/auth/validate/route.js
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const supabaseAdmin = createAdminClient();
  try {
    const sessionToken = request.cookies.get('company_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'No session token' },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('company_user_sessions')
      .select(
        `
        user_id,
        company_id,
        expires_at,
        company_users!inner(
          id,
          email,
          first_name,
          last_name,
          role,
          status,
          companies!inner(
            id,
            name,
            slug,
            subscription_status
          )
        )
      `
      )
      .eq('session_token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    if (
      data.company_users.status !== 'active' ||
      data.company_users.companies.subscription_status !== 'active'
    ) {
      return NextResponse.json(
        { success: false, message: 'Account or subscription is not active' },
        { status: 401 }
      );
    }

    await supabaseAdmin
      .from('company_user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('session_token', sessionToken);

    return NextResponse.json({
      success: true,
      user: {
        id: data.company_users.id,
        email: data.company_users.email,
        first_name: data.company_users.first_name,
        last_name: data.company_users.last_name,
        role: data.company_users.role,
        company_id: data.company_id,
        company_name: data.company_users.companies.name,
        company_slug: data.company_users.companies.slug,
      },
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { success: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}