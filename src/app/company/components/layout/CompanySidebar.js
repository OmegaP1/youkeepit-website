// src/app/company/components/layout/CompanySidebar.js
'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Smartphone,
  Receipt,
  BarChart3,
  Settings,
  ChevronRight,
  TrendingUp,
  Zap,
  Building2,
} from 'lucide-react';

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics',
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: ShoppingBag,
    description: 'Manage Device Offers',
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: Users,
    description: 'Staff Management',
  },
  {
    id: 'devices',
    label: 'Devices',
    icon: Smartphone,
    description: 'Device Inventory',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: Receipt,
    description: 'Payment History',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
    description: 'Analytics & Reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Company Settings',
  },
];

export default function CompanySidebar({ activeTab, onTabChange, collapsed }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-30">
        <div className="animate-pulse p-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg mb-3"></div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-30 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } overflow-hidden`}
    >
      <div className="h-full flex flex-col">
        {/* Company Brand */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Company Portal</h2>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center transition-all duration-200 rounded-xl p-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : 'justify-start'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-blue-600' : 'text-current'
                      }`}
                    />
                    {!collapsed && (
                      <>
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-blue-400 ml-auto" />
                        )}
                      </>
                    )}
                  </div>
                </button>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}

                {/* Description */}
                {!collapsed && (
                  <div className="ml-11">
                    {isActive && (
                      <p
                        className={`text-xs transition-colors ${
                          isActive ? 'text-current opacity-70' : 'text-gray-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Company Stats */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200/50">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100/50">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-semibold text-gray-900">
                  Quick Stats
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Offers</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Wipes</span>
                  <span className="font-semibold text-orange-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-green-600">$4,280</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200/50">
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">
                    +23% vs last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}