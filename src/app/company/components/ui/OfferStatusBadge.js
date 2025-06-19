// src/app/company/components/ui/OfferStatusBadge.js
'use client';

export default function OfferStatusBadge({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending_acceptance':
        return {
          label: 'Pending Acceptance',
          className:
            'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200',
          dot: 'bg-orange-500',
        };
      case 'pending_wipe':
        return {
          label: 'Pending Wipe',
          className:
            'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'wipe_confirmed':
        return {
          label: 'Wipe Confirmed',
          className:
            'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200',
          dot: 'bg-purple-500',
        };
      case 'completed':
        return {
          label: 'Completed',
          className:
            'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          dot: 'bg-green-500',
        };
      case 'expired':
        return {
          label: 'Expired',
          className:
            'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
          dot: 'bg-red-500',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          className:
            'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          dot: 'bg-gray-500',
        };
      default:
        return {
          label: 'Unknown',
          className:
            'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          dot: 'bg-gray-500',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${config.className}`}
    >
      <span
        className={`w-2 h-2 ${config.dot} rounded-full mr-2 animate-pulse`}
      ></span>
      {config.label}
    </span>
  );
}
