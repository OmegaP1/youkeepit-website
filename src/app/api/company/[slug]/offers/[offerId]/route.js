// src/app/api/company/[slug]/offers/[offerId]/route.js
import { NextResponse } from 'next/server';
import { CompanyService } from '@/lib/services/companyService';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { slug, offerId } = params;
    const body = await request.json();
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Update offer status
    const result = await CompanyService.updateOfferStatus(
      offerId, 
      companyResult.data.id, 
      body.status, 
      body.additionalData || {}
    );
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to update offer' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });

  } catch (error) {
    console.error('Update offer API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}