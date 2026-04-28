// src/app/company/components/devices/DevicesManager.js
'use client';

import { Monitor, Plus, Upload, HardDrive } from 'lucide-react';

export default function DevicesManager({ showMessage }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device Inventory</h1>
          <p className="text-gray-600 mt-1">
            Manage your company's device inventory.
          </p>
        </div>
        <button
          onClick={() => showMessage('Device management coming soon!', 'info')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Device</span>
        </button>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <HardDrive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Device Inventory Management
        </h3>
        <p className="text-gray-600 mb-6">
          Device inventory features are coming soon! You'll be able to track,
          manage, and organize all company devices.
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