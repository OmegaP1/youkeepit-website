// src/app/company/components/CompanyDashboard.js
'use client';

import { useState, useEffect } from 'react';
import CompanyLayout from './layout/CompanyLayout';
import LoadingScreen from './ui/LoadingScreen';
import MessageAlert from './ui/MessageAlert';
import DashboardOverview from './dashboard/DashboardOverview';
import OffersManager from './offers/OffersManager';
import EmployeesManager from './employees/EmployeesManager';
import DevicesManager from './devices/DevicesManager';
import TransactionsManager from './transactions/TransactionsManager';
import ReportsManager from './reports/ReportsManager';
import SettingsManager from './settings/SettingsManager';

export default function CompanyDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
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

      // Show navigation feedback
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

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <LoadingScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
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
      <CompanyLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      >
        {/* Message Alert */}
        {message && (
          <div className="fixed top-20 right-4 z-50">
            <MessageAlert
              message={message.text}
              type={message.type}
              onClose={clearMessage}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{renderTabContent()}</div>
        </main>
      </CompanyLayout>
    </div>
  );
}
