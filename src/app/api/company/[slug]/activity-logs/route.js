// src/app/api/company/[slug]/activity-logs/route.js
import { NextResponse } from 'next/server';
import { CompanyService } from '@/lib/services/companyService';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Build filters from query params
    const filters = {};
    if (searchParams.get('user_id')) filters.user_id = searchParams.get('user_id');
    if (searchParams.get('entity_type')) filters.entity_type = searchParams.get('entity_type');
    if (searchParams.get('limit')) filters.limit = parseInt(searchParams.get('limit'));

    // Get activity logs
    const result = await CompanyService.getActivityLogs(companyResult.data.id, filters);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to load activity logs' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });

  } catch (error) {
    console.error('Activity logs API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}