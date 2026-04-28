// src/app/api/company/[slug]/offers/route.js
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
    if (searchParams.get('status')) filters.status = searchParams.get('status');
    if (searchParams.get('employee_id')) filters.employee_id = searchParams.get('employee_id');

    // Get offers
    const result = await CompanyService.getOffers(companyResult.data.id, filters);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to load offers' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });

  } catch (error) {
    console.error('Offers API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { slug } = params;
    const body = await request.json();
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    const { device_id, employee_id, offer_amount, condition_assessment } = body;
    
    if (!device_id || !employee_id || !offer_amount || !condition_assessment) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: device_id, employee_id, offer_amount, condition_assessment' },
        { status: 400 }
      );
    }

    // Set default values for offer
    const offerData = {
      device_id,
      employee_id,
      offer_amount: parseFloat(offer_amount),
      estimated_value: body.estimated_value ? parseFloat(body.estimated_value) : parseFloat(offer_amount),
      condition_assessment,
      status: 'pending',
      response_deadline: body.response_deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      pickup_address: body.pickup_address || '',
      payment_method: body.payment_method || 'bank_transfer',
      assessment_notes: body.assessment_notes || '',
      photos: body.photos || [],
      notes: body.notes || '',
    };

    // Create offer
    const result = await CompanyService.createOffer(companyResult.data.id, offerData);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to create offer' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Offer created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Create offer API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}