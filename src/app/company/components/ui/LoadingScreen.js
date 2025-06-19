// src/app/company/components/ui/LoadingScreen.js
'use client';

import { Building2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <Building2 className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Loading company dashboard...</p>
      </div>
    </div>
  );
}