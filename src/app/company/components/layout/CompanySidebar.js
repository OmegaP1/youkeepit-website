// src/app/company/components/layout/CompanySidebar.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
    path: '',
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: ShoppingBag,
    description: 'Manage Device Offers',
    path: '/offers',
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: Users,
    description: 'Staff Management',
    path: '/employees',
  },
  {
    id: 'devices',
    label: 'Devices',
    icon: Smartphone,
    description: 'Device Inventory',
    path: '/devices',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: Receipt,
    description: 'Payment History',
    path: '/transactions',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
    description: 'Analytics & Reports',
    path: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Company Settings',
    path: '/settings',
  },
];

export default function CompanySidebar({ collapsed, companySlug }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname && companySlug) {
      const basePath = `/company/${companySlug}`;
      const currentPath = pathname.replace(basePath, '') || '';

      // Find the active tab based on current path
      const currentItem = sidebarItems.find(item => item.path === currentPath);
      if (currentItem) {
        setActiveTab(currentItem.id);
      }
    }
  }, [pathname, companySlug]);

  const handleTabChange = tabId => {
    const item = sidebarItems.find(item => item.id === tabId);
    if (item) {
      setActiveTab(tabId);
      const newPath = `/company/${companySlug}${item.path}`;
      router.push(newPath);
    }
  };

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
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Company Branding */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-gray-900 truncate">
                  {companySlug
                    ?.replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
                <p className="text-xs text-gray-500">Company Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 w-5 h-5 ${
                    activeTab === item.id
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {!collapsed && (
                  <>
                    <div className="ml-3 flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600">
                        {item.description}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeTab === item.id
                          ? 'text-blue-600 transform rotate-90'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">
                    Analytics
                  </h4>
                  <p className="text-xs text-gray-600">
                    Track your performance
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">
                    +12% this month
                  </span>
                </div>
                <button
                  onClick={() => handleTabChange('reports')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  View →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed State Tooltip Helper */}
        {collapsed && (
          <div className="absolute left-full top-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none z-50 whitespace-nowrap">
            {companySlug
              ?.replace(/-/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        )}
      </div>
    </aside>
  );
}