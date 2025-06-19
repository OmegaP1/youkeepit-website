// src/app/company/page.js
'use client';

import { useState } from 'react';
import { useCompanyAuth } from '../../hooks/useCompanyAuth';
import CompanyHeader from './components/layout/CompanyHeader';
import CompanySidebar from './components/layout/CompanySidebar';
import DashboardOverview from './components/dashboard/DashboardOverview';
import OffersManager from './components/offers/OffersManager';
import EmployeesManager from './components/employees/EmployeesManager';
import ProfileSettings from './components/settings/ProfileSettings';
import SettingsManager from './components/settings/SettingsManager';

// Toast Message Component
function ToastMessage({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg border ${
        type === 'success'
          ? 'bg-green-50 border-green-200 text-green-700'
          : type === 'error'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-blue-50 border-blue-200 text-blue-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const { user, logout } = useCompanyAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview showMessage={showMessage} />;
      case 'offers':
        return <OffersManager showMessage={showMessage} />;
      case 'employees':
        return <EmployeesManager showMessage={showMessage} />;
      case 'devices':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Device Management
            </h3>
            <p className="text-gray-600">
              Device inventory features coming soon!
            </p>
          </div>
        );
      case 'transactions':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Transaction Management
            </h3>
            <p className="text-gray-600">
              Transaction history features coming soon!
            </p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Reports & Analytics
            </h3>
            <p className="text-gray-600">
              Advanced reporting features coming soon!
            </p>
          </div>
        );
      case 'profile':
        return <ProfileSettings showMessage={showMessage} />;
      case 'settings':
        return <SettingsManager showMessage={showMessage} />;
      default:
        return <DashboardOverview showMessage={showMessage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CompanyHeader
        onLogout={logout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        onTabChange={handleTabChange}
      />

      {/* Sidebar */}
      <CompanySidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        collapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="p-6">{renderContent()}</div>
      </main>

      {/* Toast Messages */}
      <ToastMessage
        message={message}
        type={messageType}
        onClose={() => setMessage('')}
      />
    </div>
  );
}