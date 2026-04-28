// src/app/company/components/layout/CompanyLayout.js
'use client';

import { useState, useEffect } from 'react';
import CompanyHeader from './CompanyHeader';
import CompanySidebar from './CompanySidebar';
import DashboardOverview from '../dashboard/DashboardOverview';
import OffersManager from '../offers/OffersManager';
import LoadingScreen from '../ui/LoadingScreen';
import MessageAlert from '../ui/MessageAlert';

// Placeholder components for missing features
const EmployeesManager = ({ showMessage }) => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Employee Management
        </h2>
        <p className="text-gray-600 mb-6">
          This feature is coming soon! You'll be able to manage employee
          profiles, departments, and device assignments.
        </p>
        <button
          onClick={() =>
            showMessage &&
            showMessage('Employee management feature coming soon!', 'info')
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);

const DevicesManager = ({ showMessage }) => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Device Inventory
        </h2>
        <p className="text-gray-600 mb-6">
          Track and manage your company's device inventory, including
          smartphones, tablets, and laptops.
        </p>
        <button
          onClick={() =>
            showMessage &&
            showMessage('Device management feature coming soon!', 'info')
          }
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);

const TransactionsManager = ({ showMessage }) => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM13 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Transaction History
        </h2>
        <p className="text-gray-600 mb-6">
          View and analyze all device sale transactions, payments, and financial
          reports.
        </p>
        <button
          onClick={() =>
            showMessage &&
            showMessage('Transaction management feature coming soon!', 'info')
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);

const ReportsManager = ({ showMessage }) => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analytics & Reports
        </h2>
        <p className="text-gray-600 mb-6">
          Generate detailed reports on sales performance, employee engagement,
          and business insights.
        </p>
        <button
          onClick={() =>
            showMessage && showMessage('Reports feature coming soon!', 'info')
          }
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);

const SettingsManager = ({ showMessage }) => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Company Settings
        </h2>
        <p className="text-gray-600 mb-6">
          Configure company preferences, user permissions, and system
          integrations.
        </p>
        <button
          onClick={() =>
            showMessage && showMessage('Settings feature coming soon!', 'info')
          }
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);

export default function CompanyLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState(null);

  // Message management
  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    showMessage('Signing out...', 'info');

    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Clear any stored authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('companyAuth');
    }
    onLogout();
  };

  const handleTabChange = tab => {
    // Add loading state for tab transitions
    setLoading(true);

    setTimeout(() => {
      setActiveTab(tab);
      setLoading(false);

      // Show navigation feedback for non-dashboard tabs
      const tabNames = {
        dashboard: 'Dashboard',
        offers: 'Sale Offers',
        employees: 'Employees',
        devices: 'Devices',
        transactions: 'Transactions',
        reports: 'Reports',
        settings: 'Settings',
      };

      if (tab !== 'dashboard') {
        showMessage(`Switched to ${tabNames[tab]}`, 'info');
      }
    }, 300);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <LoadingScreen message="Loading Company Portal..." />;
  }

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            showMessage={showMessage}
            onNavigateToOffers={() => handleTabChange('offers')}
          />
        );
      case 'offers':
        return <OffersManager showMessage={showMessage} />;
      case 'employees':
        return <EmployeesManager showMessage={showMessage} />;
      case 'devices':
        return <DevicesManager showMessage={showMessage} />;
      case 'transactions':
        return <TransactionsManager showMessage={showMessage} />;
      case 'reports':
        return <ReportsManager showMessage={showMessage} />;
      case 'settings':
        return <SettingsManager showMessage={showMessage} />;
      default:
        return (
          <DashboardOverview
            showMessage={showMessage}
            onNavigateToOffers={() => handleTabChange('offers')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CompanyHeader
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Sidebar */}
      <CompanySidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        collapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } mt-16`}
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        {renderTabContent()}
      </main>

      {/* Message Alert */}
      <MessageAlert message={message} onClose={clearMessage} />

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
}