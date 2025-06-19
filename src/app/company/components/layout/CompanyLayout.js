// src/app/company/components/layout/CompanyLayout.js
"use client";

import CompanyHeader from "./CompanyHeader";
import CompanySidebar from "./CompanySidebar";

export default function CompanyLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  onLogout 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader onLogout={onLogout} />
      
      <div className="flex">
        <CompanySidebar activeTab={activeTab} onTabChange={onTabChange} />
        
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}