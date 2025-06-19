// src/app/company/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompanyLayout from './components/layout/CompanyLayout';
import LoadingScreen from './components/ui/LoadingScreen';

export default function CompanyPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Check authentication status
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const auth = localStorage.getItem('companyAuth');
        console.log('Company auth check:', auth); // Debug log

        if (auth) {
          try {
            const authData = JSON.parse(auth);
            if (authData && authData.isAuthenticated) {
              setIsAuthenticated(true);
            } else {
              router.push('/login/company');
            }
          } catch (error) {
            console.error('Error parsing auth data:', error);
            router.push('/login/company');
          }
        } else {
          router.push('/login/company');
        }
      }
      setIsLoading(false);
    };

    // Small delay to ensure proper mounting
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('companyAuth');
    }
    setIsAuthenticated(false);
    router.push('/login/company');
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted || isLoading) {
    return <LoadingScreen message="Loading Company Portal..." />;
  }

  // If not authenticated, show loading while redirecting
  if (!isAuthenticated) {
    return <LoadingScreen message="Redirecting to login..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyLayout onLogout={handleLogout} />
    </div>
  );
}