// src/app/api/company/auth/validate/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  try {
    console.log('=== VALIDATION REQUEST ===');

    // Get all cookies to debug
    const cookieHeader = request.headers.get('cookie');
    console.log('All cookies:', cookieHeader);

    const sessionToken = request.cookies.get('company_session')?.value;
    console.log('Session token from cookie:', sessionToken);

    if (!sessionToken) {
      console.log('No session token found');
      return NextResponse.json(
        { success: false, message: 'No session token' },
        { status: 401 }
      );
    }

    // Validate session in database and get user info
    console.log('Validating session token in database...');
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

    console.log('Database query result:', { data, error });

    if (error || !data) {
      console.log('Session not found or expired:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Check if user and company are still active
    if (
      data.company_users.status !== 'active' ||
      data.company_users.companies.subscription_status !== 'active'
    ) {
      console.log('User or company inactive');
      return NextResponse.json(
        { success: false, message: 'Account or subscription is not active' },
        { status: 401 }
      );
    }

    // Update last activity
    await supabaseAdmin
      .from('company_user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('session_token', sessionToken);

    const userResponse = {
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
    };

    console.log('Validation successful:', userResponse);
    return NextResponse.json(userResponse);

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { success: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}