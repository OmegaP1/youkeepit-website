// src/app/company/components/dashboard/QuickActions.js
'use client';

import { Plus, Upload, FileText, Settings, Users, BarChart3 } from 'lucide-react';

export default function QuickActions({ onTabChange }) {
  const actions = [
    {
      id: 'create-offer',
      title: 'Create New Offer',
      description: 'Set up a device sale offer for an employee',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      primary: true
    },
    {
      id: 'devices',
      title: 'Add Device',
      description: 'Add new device to inventory',
      icon: Upload,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'reports',
      title: 'Generate Report',
      description: 'Export sales and compliance reports',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'employees',
      title: 'Manage Employees',
      description: 'View and manage employee accounts',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 'reports',
      title: 'Analytics',
      description: 'View detailed performance metrics',
      icon: BarChart3,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure company preferences',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600">Common tasks to get things done faster</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onTabChange(action.id)}
              className={`${action.color} text-white p-4 rounded-lg transition-colors text-left group ${
                action.primary ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-6 w-6 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{action.title}</h3>
                  <p className="text-xs opacity-90 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}