// src/app/company/components/layout/CompanySidebar.js
"use client";

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Laptop,
  CreditCard,
  BarChart3,
  Settings,
  Plus,
  FileText,
} from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'offers', label: 'Sale Offers', icon: ShoppingBag },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'devices', label: 'Device Inventory', icon: Laptop },
  { id: 'transactions', label: 'Transactions', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const quickActions = [
  { id: 'create-offer', label: 'Create New Offer', icon: Plus },
  { id: 'add-device', label: 'Add Device', icon: Laptop },
  { id: 'export-report', label: 'Export Report', icon: FileText },
];

export default function CompanySidebar({ activeTab, onTabChange }) {
  return (
    <div className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
      {/* Main Navigation */}
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Main Menu
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    activeTab === tab.id ? "text-blue-700" : "text-gray-400"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quick Actions */}
      <div className="mt-8 px-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Quick Actions
        </div>
        <div className="space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                <Icon className="mr-3 h-4 w-4" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-8 mx-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Today's Summary
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Offers</span>
            <span className="font-medium text-blue-600">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pending Wipes</span>
            <span className="font-medium text-orange-600">5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed Today</span>
            <span className="font-medium text-green-600">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}