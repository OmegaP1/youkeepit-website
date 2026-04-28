// src/app/api/company/[slug]/employees/[employeeId]/route.js
import { NextResponse } from 'next/server';
import { CompanyService } from '@/lib/services/companyService';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { slug, employeeId } = params;
    const body = await request.json();
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Update employee
    const result = await CompanyService.updateEmployee(employeeId, companyResult.data.id, body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to update employee' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });

  } catch (error) {
    console.error('Update employee API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug, employeeId } = params;
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Delete employee
    const result = await CompanyService.deleteEmployee(employeeId, companyResult.data.id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to delete employee' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Employee deleted successfully',
    });

  } catch (error) {
    console.error('Delete employee API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}