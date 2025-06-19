// src/app/company/components/ui/LoadingScreen.js
'use client';

import { Building2, Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
            <Building2 className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Loading Company Portal
          </h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            Setting up your dashboard and fetching the latest data...
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-500 font-medium">Please wait</span>
        </div>

        {/* Loading Progress */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
