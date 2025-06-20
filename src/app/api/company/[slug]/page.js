// src/app/company/[slug]/page.js
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CompanySlugRedirect() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const validateAndRedirect = async () => {
      try {
        // Check if user has access to this company slug
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
          localStorage.removeItem('companyAuth');
          sessionStorage.removeItem('companyAuth');
          router.push('/login/company');
          return;
        }

        const result = await response.json();

        if (result.success) {
          // Check if user's company slug matches the URL slug
          if (result.user.company_slug !== slug) {
            // Redirect to correct company URL or show error
            alert(`Access denied: You can only access ${result.user.company_slug}, not ${slug}`);
            router.push(`/company/${result.user.company_slug}`);
            return;
          }

          // Update stored auth with current company context
          const updatedAuth = {
            ...authData,
            user: result.user,
            currentCompanySlug: slug,
          };

          if (localStorage.getItem('companyAuth')) {
            localStorage.setItem('companyAuth', JSON.stringify(updatedAuth));
          } else {
            sessionStorage.setItem('companyAuth', JSON.stringify(updatedAuth));
          }

          // Redirect to main company portal with company context
          router.push('/company');
        } else {
          localStorage.removeItem('companyAuth');
          sessionStorage.removeItem('companyAuth');
          router.push('/login/company');
        }
      } catch (error) {
        console.error('Company validation error:', error);
        router.push('/login/company');
      }
    };

    validateAndRedirect();
  }, [slug, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading {slug.replace(/-/g, ' ')} portal...</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to company dashboard</p>
      </div>
    </div>
  );
}