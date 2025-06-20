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
      className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
        type === 'success'
          ? 'bg-green-50 border-green-200 text-green-700'
          : type === 'error'
            ? 'bg-red-50 border-red-200 text-red-700'
            : type === 'warning'
              ? 'bg-orange-50 border-orange-200 text-orange-700'
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
    console.log('Changing tab to:', tabId); // Debug log
    setActiveTab(tabId);

    // Show feedback message for navigation
    const tabNames = {
      dashboard: 'Dashboard',
      offers: 'Sale Offers',
      employees: 'Employee Management',
      devices: 'Device Management',
      transactions: 'Transactions',
      reports: 'Reports & Analytics',
      settings: 'Settings',
    };

    if (tabNames[tabId]) {
      showMessage(`Switched to ${tabNames[tabId]}`, 'info');
    }
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            showMessage={showMessage}
            onTabChange={handleTabChange}
          />
        );
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
            <p className="text-gray-600 mb-4">
              Device inventory features coming soon!
            </p>
            <button
              onClick={() => handleTabChange('offers')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Offers Instead
            </button>
          </div>
        );
      case 'transactions':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Transaction History
            </h3>
            <p className="text-gray-600 mb-4">
              Transaction tracking features coming soon!
            </p>
            <button
              onClick={() => handleTabChange('offers')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Offers Instead
            </button>
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
            <p className="text-gray-600 mb-4">
              Advanced reporting features coming soon!
            </p>
            <button
              onClick={() => handleTabChange('dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        );
      case 'settings':
        return <SettingsManager showMessage={showMessage} />;
      default:
        return (
          <DashboardOverview
            showMessage={showMessage}
            onTabChange={handleTabChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Message */}
      <ToastMessage
        message={message}
        type={messageType}
        onClose={() => setMessage('')}
      />

      {/* Header */}
      <CompanyHeader
        user={user}
        onLogout={logout}
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <CompanySidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          collapsed={sidebarCollapsed}
        />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          } mt-16`}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}