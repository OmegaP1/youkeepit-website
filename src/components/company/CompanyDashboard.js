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
    <>
      <CompanyLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      >
        <div className="animate-fade-in">{renderTabContent()}</div>
      </CompanyLayout>

      <MessageAlert message={message} onClose={clearMessage} />

      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shrink-width {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-shrink-width {
          animation: shrink-width 5s linear forwards;
        }
      `}</style>
    </>
  );
}
