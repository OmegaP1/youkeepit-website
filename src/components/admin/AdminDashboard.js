// src/components/admin/AdminDashboard.js
'use client';

import { useState } from 'react';
import AdminLayout from '@/app/admin/components/layout/AdminLayout';
import LoadingScreen from '@/app/admin/components/ui/LoadingScreen';
import MessageAlert from '@/app/admin/components/ui/MessageAlert';
import SiteContentManager from '@/app/admin/components/content/SiteContentManager';
import FeaturesManager from '@/app/admin/components/features/FeaturesManager';
import TestimonialsManager from '@/app/admin/components/testimonials/TestimonialsManager';
import PricingManager from '@/app/admin/components/pricing/PricingManager';
import FAQManager from '@/app/admin/components/faq/FAQManager';
import NavigationManager from '@/app/admin/components/navigation/NavigationManager';
import StatsManager from '@/app/admin/components/stats/StatsManager';
import ProblemManager from '@/app/admin/components/problem/ProblemManager';
import HowItWorksManager from '@/app/admin/components/howitworks/HowItWorksManager';
import BenefitsManager from '@/app/admin/components/benefits/BenefitsManager';
import { useMessage } from '@/hooks/useMessage';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(false);
  const { message, showMessage, clearMessage } = useMessage();

  const handleLogout = async () => {
    // Clear any stored authentication data
    localStorage.removeItem('adminAuth');
    onLogout();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return <SiteContentManager showMessage={showMessage} />;
      case 'features':
        return <FeaturesManager showMessage={showMessage} />;
      case 'testimonials':
        return <TestimonialsManager showMessage={showMessage} />;
      case 'pricing':
        return <PricingManager showMessage={showMessage} />;
      case 'faq':
        return <FAQManager showMessage={showMessage} />;
      case 'navigation':
        return <NavigationManager showMessage={showMessage} />;
      case 'stats':
        return <StatsManager showMessage={showMessage} />;
      case 'problem':
        return <ProblemManager showMessage={showMessage} />;
      case 'howitworks':
        return <HowItWorksManager showMessage={showMessage} />;
      case 'benefits':
        return <BenefitsManager showMessage={showMessage} />;
      default:
        return <SiteContentManager showMessage={showMessage} />;
    }
  };

  return (
    <>
      <AdminLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      >
        {renderTabContent()}
      </AdminLayout>

      <MessageAlert message={message} onClose={clearMessage} />
    </>
  );
}