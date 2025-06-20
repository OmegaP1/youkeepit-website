// src/app/company/[slug]/layout.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CompanyHeader from '../components/layout/CompanyHeader';
import CompanySidebar from '../components/layout/CompanySidebar';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading company portal...</p>
      </div>
    </div>
  );
}

export default function CompanySlugLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    validateAccess();
  }, [slug]);

  const validateAccess = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check for stored auth data
      const storedAuth = 
        localStorage.getItem('companyAuth') || 
        sessionStorage.getItem('companyAuth');

      if (!storedAuth) {
        router.push('/login/company');
        return;
      }

      const authData = JSON.parse(storedAuth);

      // Validate with server
      const response = await fetch('/api/company/auth/validate', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        // Clear invalid auth data
        localStorage.removeItem('companyAuth');
        sessionStorage.removeItem('companyAuth');
        router.push('/login/company');
        return;
      }

      const result = await response.json();

      if (result.success) {
        // Check if user's company slug matches the URL slug
        if (result.user.company_slug !== slug) {
          setError('Access denied: You do not have permission to access this company.');
          return;
        }

        setUser(result.user);
      } else {
        localStorage.removeItem('companyAuth');
        sessionStorage.removeItem('companyAuth');
        router.push('/login/company');
      }
    } catch (error) {
      console.error('Auth validation error:', error);
      setError('Authentication error. Please try logging in again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/company/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('companyAuth');
      sessionStorage.removeItem('companyAuth');
      router.push('/login/company');
    }
  };

  if (loading) {
    return <LoadingScreen />;
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

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CompanyHeader
        user={user}
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Sidebar */}
      <CompanySidebar
        collapsed={sidebarCollapsed}
        companySlug={slug}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
        style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}