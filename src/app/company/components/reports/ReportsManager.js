// src/app/company/components/reports/ReportsManager.js
'use client';

import { useState } from 'react';

export default function ReportsManager({ showMessage }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate reports and view performance metrics</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500">Reports and analytics coming soon...</div>
      </div>
    </div>
  );
}