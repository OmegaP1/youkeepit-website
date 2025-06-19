// src/app/company/components/employees/EmployeesManager.js
'use client';

import { Users, Plus, Search, UserPlus } from 'lucide-react';

export default function EmployeesManager({ showMessage }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage employee accounts and permissions.
          </p>
        </div>
        <button
          onClick={() => showMessage('Employee management coming soon!', 'info')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Reports & Analytics
        </h3>
        <p className="text-gray-600 mb-6">
          Advanced reporting and analytics features are coming soon! Track sales performance, compliance metrics, and more.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => showMessage('Feature in development', 'info')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
      