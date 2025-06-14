// src/app/admin/components/layout/AdminLayout.js
"use client";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  onLogout 
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={onLogout} />
      
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}