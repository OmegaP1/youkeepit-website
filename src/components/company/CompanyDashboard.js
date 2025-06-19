// src/components/company/CompanyDashboard.js
'use client';

import { useState } from 'react';
import CompanyLayout from '@/app/company/components/layout/CompanyLayout';
import LoadingScreen from '@/app/company/components/ui/LoadingScreen';
import MessageAlert from '@/app/company/components/ui/MessageAlert';

// Import managers for each section
import DashboardOverview from '@/app/company/components/dashboard/DashboardOverview';
import OffersManager from '@/app/company/components/offers/OffersManager';
import EmployeesManager from '@/app/company/components/employees/EmployeesManager';
import DevicesManager from '@/app/company/components/devices/DevicesManager';
import TransactionsManager from '@/app/company/components/transactions/TransactionsManager';
import ReportsManager from '@/app/company/components/reports/ReportsManager';
import SettingsManager from '@/app/company/components/settings/SettingsManager';
import CreateOfferWizard from '@/app/company/components/offers/CreateOfferWizard';

import { useMessage } from '@/hooks/useMessage';

export default function CompanyDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const { message, showMessage, clearMessage } = useMessage();

  const handleLogout = async () => {
    localStorage.removeItem('companyAuth');
    onLogout();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview showMessage={showMessage} onTabChange={setActiveTab} />;
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
      case 'create-offer':
        return <CreateOfferWizard showMessage={showMessage} onComplete={() => setActiveTab('offers')} />;
      default:
        return <DashboardOverview showMessage={showMessage} onTabChange={setActiveTab} />;
    }
  };

  return (
    <>
      <CompanyLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      >
        {renderTabContent()}
      </CompanyLayout>

      <MessageAlert message={message} onClose={clearMessage} />
    </>
  );
}