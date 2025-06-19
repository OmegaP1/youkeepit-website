// src/app/company/components/layout/CompanySidebar.js
'use client';

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Monitor,
  CreditCard,
  BarChart3,
  Settings,
  Plus,
  Zap,
  TrendingUp,
} from 'lucide-react';

export default function CompanySidebar({ activeTab, onTabChange, collapsed }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics',
      color: 'blue',
    },
    {
      id: 'offers',
      label: 'Sale Offers',
      icon: ShoppingBag,
      description: 'Create & Manage Offers',
      badge: 'New',
      color: 'purple',
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: Users,
      description: 'Employee Management',
      color: 'green',
    },
    {
      id: 'devices',
      label: 'Devices',
      icon: Monitor,
      description: 'Device Inventory',
      color: 'indigo',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: CreditCard,
      description: 'Payment History',
      color: 'emerald',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      description: 'Analytics & Reports',
      color: 'orange',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Company Settings',
      color: 'gray',
    },
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive
        ? 'bg-blue-100 text-blue-700 border-blue-200'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700',
      purple: isActive
        ? 'bg-purple-100 text-purple-700 border-purple-200'
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700',
      green: isActive
        ? 'bg-green-100 text-green-700 border-green-200'
        : 'text-gray-600 hover:bg-green-50 hover:text-green-700',
      indigo: isActive
        ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700',
      emerald: isActive
        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700',
      orange: isActive
        ? 'bg-orange-100 text-orange-700 border-orange-200'
        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700',
      gray: isActive
        ? 'bg-gray-100 text-gray-700 border-gray-200'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700',
    };
    return colors[color] || colors.gray;
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-white/90 backdrop-blur-xl border-r border-gray-200/50 transition-all duration-300 ease-in-out z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Quick Action Button */}
        <div className={`p-4 ${collapsed ? 'px-2' : ''}`}>
          <button
            onClick={() => onTabChange('offers')}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white ${
              collapsed ? 'p-3' : 'px-4 py-3'
            } rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2`}
          >
            <Plus className="w-5 h-5" />
            {!collapsed && <span>Create New Offer</span>}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className={`flex-1 ${collapsed ? 'px-2' : 'px-4'} space-y-2`}>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left ${
                    collapsed ? 'p-3' : 'p-4'
                  } rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? `${getColorClasses(item.color, true)} border shadow-sm`
                      : getColorClasses(item.color, false)
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  {/* Background gradient for active state */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-xl"></div>
                  )}

                  <div
                    className={`relative z-10 flex items-center ${collapsed ? 'justify-center' : 'space-x-4'}`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? 'text-current'
                          : 'text-gray-400 group-hover:text-current'
                      } transition-colors duration-200`}
                    />

                    {!collapsed && (
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs mt-1 ${
                            isActive
                              ? 'text-current opacity-70'
                              : 'text-gray-500'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </button>
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
