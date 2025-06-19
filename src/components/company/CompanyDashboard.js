// src/components/company/CompanyDashboard.js
'use client';

import { useState, useEffect } from 'react';
import CompanyLayout from '@/app/company/components/layout/CompanyLayout';
import LoadingScreen from '@/app/company/components/ui/LoadingScreen';
import MessageAlert from '@/app/company/components/ui/MessageAlert';
import DashboardOverview from '@/app/company/components/dashboard/DashboardOverview';
import OffersManager from '@/app/company/components/offers/OffersManager';
import EmployeesManager from '@/app/company/components/employees/EmployeesManager';
import DevicesManager from '@/app/company/components/devices/DevicesManager';
import TransactionsManager from '@/app/company/components/transactions/TransactionsManager';
import ReportsManager from '@/app/company/components/reports/ReportsManager';
import SettingsManager from '@/app/company/components/settings/SettingsManager';
import { useMessage } from '@/hooks/useMessage';

export default function CompanyDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { message, showMessage, clearMessage } = useMessage();

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

  const handleTabChange = newTab => {
    setActiveTab(newTab);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <LoadingScreen />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'offers':
        return <OffersManager />;
      case 'employees':
        return <EmployeesManager />;
      case 'devices':
        return <DevicesManager />;
      case 'transactions':
        return <TransactionsManager />;
      case 'reports':
        return <ReportsManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {message && (
        <MessageAlert
          message={message.text}
          type={message.type}
          onClose={clearMessage}
        />
      )}

      <CompanyLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      >
        {renderActiveComponent()}
      </CompanyLayout>
    </div>
  );
}