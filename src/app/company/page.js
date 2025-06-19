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

  // Show loading screen during SSR, while mounting, or while checking auth
  if (!mounted || isLoading || !isClient) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <CompanyAuth onLogin={login} />;
  }

  return <CompanyDashboard onLogout={logout} />;
}