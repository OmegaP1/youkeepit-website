// src/app/company/components/ui/LoadingScreen.js
'use client';

export default function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
          {/* Inner pulsing dot */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-500">
          Please wait while we prepare your dashboard...
        </p>

        {/* Loading progress bar */}
        <div className="mt-4 w-48 mx-auto">
          <div className="bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full animate-pulse"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}