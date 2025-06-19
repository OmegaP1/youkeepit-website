// src/app/company/components/layout/CompanyLayout.js
'use client';

import { useState, useEffect } from 'react';
import CompanyHeader from './CompanyHeader';
import CompanySidebar from './CompanySidebar';

export default function CompanyLayout({
  children,
  activeTab,
  onTabChange,
  onLogout,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div className="animate-pulse">
          <div className="h-16 bg-white border-b border-gray-200"></div>
          <div className="flex">
            <div className="w-64 h-screen bg-white border-r border-gray-200"></div>
            <div className="flex-1 p-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <CompanyHeader
        onLogout={onLogout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex">
        <CompanySidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          collapsed={sidebarCollapsed}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out min-h-screen ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
          style={{ marginTop: '64px' }} // Fixed header height
        >
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="animate-fade-in">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}