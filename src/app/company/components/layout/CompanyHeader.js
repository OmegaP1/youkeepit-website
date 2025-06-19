// src/app/company/components/layout/CompanyHeader.js
'use client';

import {
  Bell,
  User,
  LogOut,
  Building2,
  Menu,
  Search,
  Settings,
  HelpCircle,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

export default function CompanyHeader({
  onLogout,
  sidebarCollapsed,
  onToggleSidebar,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Device wipe confirmation needed',
      message: 'MacBook Pro requires immediate attention',
      time: '5 min ago',
      unread: true,
      type: 'urgent',
    },
    {
      id: 2,
      title: 'Payment completed',
      message: 'Employee payment processed for Laptop #LP001',
      time: '1 hour ago',
      unread: true,
      type: 'success',
    },
    {
      id: 3,
      title: 'Sale offer created',
      message: 'New offer generated successfully',
      time: '2 hours ago',
      unread: false,
      type: 'info',
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = type => {
    switch (type) {
      case 'urgent':
        return '🔴';
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo and company name */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                KeepMyKit
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Company Portal
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:block ml-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search offers, employees, devices..."
                className="w-80 pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Help */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    {unreadCount} unread notifications
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                        notification.unread ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@company.com</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Admin User</p>
                      <p className="text-sm text-gray-600">
                        Company Administrator
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Account Settings</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
