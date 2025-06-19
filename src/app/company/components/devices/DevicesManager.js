// src/app/company/components/devices/DevicesManager.js
'use client';

import { useState } from 'react';

export default function DevicesManager({ showMessage }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Device Inventory</h1>
        <p className="text-gray-600">Manage your device catalog and pricing</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500">Device inventory management coming soon...</div>
      </div>
    </div>
  );
}