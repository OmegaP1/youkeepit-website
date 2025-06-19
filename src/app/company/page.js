// src/app/company/page.js
'use client';

import { useCompanyAuth } from '@/hooks/useCompanyAuth';
import CompanyAuth from '@/components/company/CompanyAuth';
import CompanyDashboard from '@/components/company/CompanyDashboard';
import LoadingScreen from './components/ui/LoadingScreen';
import { useEffect, useState } from 'react';

export default function CompanyPage() {
  const { isAuthenticated, isLoading, login, logout, isClient } =
    useCompanyAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing loading state during SSR
  if (!mounted || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading screen while checking auth
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <CompanyAuth onLogin={login} />;
  }

  return <CompanyDashboard onLogout={logout} />;
}