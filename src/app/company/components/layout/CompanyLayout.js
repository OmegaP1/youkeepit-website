// src/app/company/components/layout/CompanyLayout.js
'use client';

import { useState } from 'react';
import CompanyHeader from './CompanyHeader';
import CompanySidebar from './CompanySidebar';

export default function CompanyLayout({
  children,
  activeTab,
  onTabChange,
  onLogout,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <CompanyHeader
        onLogout={onLogout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex pt-16">
        <CompanySidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          collapsed={sidebarCollapsed}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          } min-h-screen`}
        >
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="animate-fade-in">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
