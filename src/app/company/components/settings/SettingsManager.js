// src/app/company/components/settings/SettingsManager.js
'use client';

import { useState } from 'react';

export default function SettingsManager({ showMessage }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-gray-600">Configure your company preferences and integrations</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500">Settings management coming soon...</div>
      </div>
    </div>
  );
}