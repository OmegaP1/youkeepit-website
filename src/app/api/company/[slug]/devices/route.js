// src/app/api/company/[slug]/devices/route.js
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
    if (searchParams.get('device_type')) filters.device_type = searchParams.get('device_type');
    if (searchParams.get('employee_id')) filters.employee_id = searchParams.get('employee_id');

    // Get devices
    const result = await CompanyService.getDevices(companyResult.data.id, filters);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to load devices' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });

  } catch (error) {
    console.error('Devices API error:', error);
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

    // Create device
    const result = await CompanyService.createDevice(companyResult.data.id, body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to create device' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });

  } catch (error) {
    console.error('Create device API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}