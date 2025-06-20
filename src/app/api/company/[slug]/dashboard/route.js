// src/app/api/company/[slug]/dashboard/route.js
import { NextResponse } from 'next/server';
import { CompanyService } from '@/lib/services/companyService';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    const companyId = companyResult.data.id;

    // Get dashboard stats
    const statsResult = await CompanyService.getDashboardStats(companyId);
    if (!statsResult.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to load dashboard data' },
        { status: 500 }
      );
    }

    // Get recent activity logs (last 10 activities)
    const activityResult = await CompanyService.getActivityLogs(companyId, { limit: 10 });
    
    // Get recent offers (last 5 offers)
    const offersResult = await CompanyService.getOffers(companyId, {});
    const recentOffers = offersResult.success ? offersResult.data.slice(0, 5) : [];

    // Get recent transactions (last 5 transactions)
    const transactionsResult = await CompanyService.getTransactions(companyId, {});
    const recentTransactions = transactionsResult.success ? transactionsResult.data.slice(0, 5) : [];

    // Calculate additional metrics
    const additionalMetrics = {
      // Device value metrics
      totalDeviceValue: statsResult.data.devices.totalValue || 0,
      averageDeviceValue: statsResult.data.devices.total > 0 
        ? (statsResult.data.devices.totalValue / statsResult.data.devices.total).toFixed(2)
        : 0,
      
      // Offer metrics
      pendingOffersValue: recentOffers
        .filter(offer => offer.status === 'pending')
        .reduce((sum, offer) => sum + (offer.offer_amount || 0), 0),
      
      // Transaction metrics
      thisMonthRevenue: recentTransactions
        .filter(tx => {
          const txDate = new Date(tx.created_at);
          const now = new Date();
          return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, tx) => sum + (tx.amount || 0), 0),
      
      // Employee activity
      activeEmployeesPercentage: statsResult.data.employees.total > 0
        ? ((statsResult.data.employees.active / statsResult.data.employees.total) * 100).toFixed(1)
        : 0,
      
      // Device utilization
      deviceUtilizationRate: statsResult.data.devices.total > 0
        ? ((statsResult.data.devices.assigned / statsResult.data.devices.total) * 100).toFixed(1)
        : 0,
    };

    // Prepare dashboard response
    const dashboardData = {
      company: {
        id: companyResult.data.id,
        name: companyResult.data.name,
        slug: companyResult.data.slug,
        industry: companyResult.data.industry,
        subscription_plan: companyResult.data.subscription_plan,
        employee_count: companyResult.data.employee_count,
      },
      stats: {
        ...statsResult.data,
        additionalMetrics,
      },
      recentActivity: activityResult.success ? activityResult.data : [],
      recentOffers,
      recentTransactions,
      summary: {
        totalEmployees: statsResult.data.employees.total,
        totalDevices: statsResult.data.devices.total,
        totalOffers: statsResult.data.offers.total,
        totalTransactions: statsResult.data.transactions.total,
        monthlyRevenue: additionalMetrics.thisMonthRevenue,
        pendingOffers: statsResult.data.offers.pending,
        availableDevices: statsResult.data.devices.available,
      },
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
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
    const { action, data } = body;
    
    // Get company by slug
    const companyResult = await CompanyService.getCompanyBySlug(slug);
    if (!companyResult.success) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    const companyId = companyResult.data.id;

    // Handle different dashboard actions
    switch (action) {
      case 'refresh_stats':
        // Refresh dashboard statistics
        const refreshedStats = await CompanyService.getDashboardStats(companyId);
        return NextResponse.json({
          success: true,
          data: refreshedStats.data,
          message: 'Stats refreshed successfully',
        });

      case 'update_company_info':
        // Update company information
        const updateResult = await CompanyService.updateCompany(companyId, data);
        if (!updateResult.success) {
          return NextResponse.json(
            { success: false, message: updateResult.error },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: updateResult.data,
          message: 'Company information updated successfully',
        });

      case 'log_activity':
        // Log custom activity
        const logResult = await CompanyService.logActivity(
          companyId,
          data.user_id,
          data.action,
          data.entity_type,
          data.entity_id,
          data.description
        );
        return NextResponse.json({
          success: true,
          data: logResult.data,
          message: 'Activity logged successfully',
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Dashboard POST API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}