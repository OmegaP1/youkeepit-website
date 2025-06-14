/ src/app/admin/components/ui/LoadingScreen.js
"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Loading Admin Panel
        </h2>
        <p className="text-gray-500">Please wait while we fetch your data...</p>
      </div>
    </div>
  );
}
