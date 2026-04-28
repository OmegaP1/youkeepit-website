// src/app/company/components/settings/SettingsManager.js
'use client';

import { useState } from 'react';
import {
  Settings,
  Building,
  Users,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Save,
  Edit,
  Plus,
  Trash2,
} from 'lucide-react';

export default function SettingsManager({ showMessage }) {
  const [activeTab, setActiveTab] = useState('company');
  const [companyData, setCompanyData] = useState({
    name: 'Acme Corporation',
    email: 'admin@acme.com',
    address: '123 Business St, San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    website: 'https://acme.com',
  });

  const [notifications, setNotifications] = useState({
    emailOfferCreated: true,
    emailWipeConfirmed: true,
    emailPaymentReceived: true,
    emailDeviceHandover: true,
    pushNotifications: true,
    weeklyReports: true,
  });

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Mail },
  ];

  const handleSave = section => {
    showMessage(`${section} settings saved successfully!`, 'success');
  };

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyData.name}
              onChange={e =>
                setCompanyData(prev => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={companyData.email}
              onChange={e =>
                setCompanyData(prev => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={companyData.address}
              onChange={e =>
                setCompanyData(prev => ({ ...prev, address: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={companyData.phone}
              onChange={e =>
                setCompanyData(prev => ({ ...prev, phone: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={companyData.website}
              onChange={e =>
                setCompanyData(prev => ({ ...prev, website: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => handleSave('Company profile')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            {
              key: 'emailOfferCreated',
              label: 'New offer created',
              description: 'Get notified when a new sale offer is created',
            },
            {
              key: 'emailWipeConfirmed',
              label: 'Device wipe confirmed',
              description: 'Get notified when device wipe is confirmed by IT',
            },
            {
              key: 'emailPaymentReceived',
              label: 'Payment received',
              description: 'Get notified when employee payment is processed',
            },
            {
              key: 'emailDeviceHandover',
              label: 'Device handover ready',
              description:
                'Get notified when device is ready for pickup/shipping',
            },
          ].map(item => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={e =>
                    setNotifications(prev => ({
                      ...prev,
                      [item.key]: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={() => handleSave('Notification')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company':
        return renderCompanySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'team':
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Team Management
            </h3>
            <p className="text-gray-600">
              Team management features coming soon!
            </p>
          </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Security Settings
            </h3>
            <p className="text-gray-600">
              Advanced security features coming soon!
            </p>
          </div>
        );
      case 'billing':
        return (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Billing & Subscription
            </h3>
            <p className="text-gray-600">
              Billing management features coming soon!
            </p>
          </div>
        );
      case 'integrations':
        return (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Integrations
            </h3>
            <p className="text-gray-600">
              Third-party integrations coming soon!
            </p>
          </div>
        );
      default:
        return renderCompanySettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your company settings and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}