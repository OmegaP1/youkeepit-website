// src/app/company/page.js
'use client';

import { useState, useEffect } from 'react';
import CompanyDashboard from '@/components/company/CompanyDashboard';
import CompanyAuth from '@/components/company/CompanyAuth';

export default function CompanyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if company admin is already authenticated
    const checkAuth = () => {
      const authData = localStorage.getItem('companyAuth');
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          if (parsed.token && parsed.expiresAt > Date.now()) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('companyAuth');
          }
        } catch (error) {
          localStorage.removeItem('companyAuth');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (authData) => {
    localStorage.setItem('companyAuth', JSON.stringify({
      ...authData,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('companyAuth');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <CompanyAuth onLogin={handleLogin} />;
  }

  return <CompanyDashboard onLogout={handleLogout} />;
}