// src/app/company/[slug]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardOverview from '../components/dashboard/DashboardOverview';

export default function CompanySlugPage() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    loadCompanyData();
  }, [slug]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check authentication
      const storedAuth = 
        localStorage.getItem('companyAuth') || 
        sessionStorage.getItem('companyAuth');

      if (!storedAuth) {
        router.push('/login/company');
        return;
      }

      const authData = JSON.parse(storedAuth);

      // Validate session with server
      const validateResponse = await fetch('/api/company/auth/validate', {
        method: 'GET',
        credentials: 'include',
      });

      if (!validateResponse.ok) {
        localStorage.removeItem('companyAuth');
        sessionStorage.removeItem('companyAuth');
        router.push('/login/company');
        return;
      }

      const validateResult = await validateResponse.json();
      
      if (!validateResult.success) {
        localStorage.removeItem('companyAuth');
        sessionStorage.removeItem('companyAuth');
        router.push('/login/company');
        return;
      }

      const user = validateResult.user;

      // Check if user has access to this specific company slug
      if (user.company_slug !== slug) {
        setError(`Access denied: You can only access ${user.company_slug}, not ${slug}`);
        return;
      }

      // Set company data from validated user
      setCompanyData({
        id: user.company_id,
        name: user.company_name,
        slug: user.company_slug,
        user: user,
      });

      // Load dashboard stats from API using company slug
      try {
        const dashboardResponse = await fetch(`/api/company/${slug}/dashboard`, {
          credentials: 'include',
        });

        if (dashboardResponse.ok) {
          const dashboardResult = await dashboardResponse.json();
          if (dashboardResult.success) {
            setDashboardStats(dashboardResult.data);
          }
        }
      } catch (dashError) {
        console.warn('Failed to load dashboard stats:', dashError);
        // Continue without stats
      }

    } catch (error) {
      console.error('Error loading company data:', error);
      setError('Failed to load company data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4 w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/login/company')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Company Data</h2>
          <p className="text-gray-600 mb-6">Unable to load company information</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Company Dashboard Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {companyData.name} Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {companyData.user?.first_name}! Here's your company overview.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Company Portal</p>
            <p className="text-lg font-medium text-gray-900">{companyData.slug}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.stats?.employees?.total || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Devices</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.stats?.devices?.total || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Offers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.stats?.offers?.pending || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardStats.stats?.additionalMetrics?.thisMonthRevenue?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Use your existing DashboardOverview component */}
      <DashboardOverview companySlug={companyData.slug} companyData={companyData} />
    </div>
  );
}