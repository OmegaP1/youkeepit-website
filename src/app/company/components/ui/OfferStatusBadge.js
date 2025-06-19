// src/app/company/components/ui/OfferStatusBadge.js
'use client';

export default function OfferStatusBadge({ status, size = 'md' }) {
  const getStatusConfig = status => {
    const configs = {
      active: {
        label: 'Active',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        dotColor: 'bg-green-500',
      },
      pending: {
        label: 'Pending',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        dotColor: 'bg-yellow-500',
      },
      expired: {
        label: 'Expired',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        dotColor: 'bg-red-500',
      },
      completed: {
        label: 'Completed',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        dotColor: 'bg-blue-500',
      },
      draft: {
        label: 'Draft',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        dotColor: 'bg-gray-500',
      },
      cancelled: {
        label: 'Cancelled',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        dotColor: 'bg-gray-400',
      },
    };
    return configs[status] || configs.draft;
  };

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      dot: 'w-1.5 h-1.5',
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      dot: 'w-2 h-2',
    },
    lg: {
      container: 'px-4 py-2 text-base',
      dot: 'w-2.5 h-2.5',
    },
  };

  const config = getStatusConfig(status);
  const sizeClass = sizeClasses[size];

  return (
    <span
      className={`inline-flex items-center space-x-1.5 font-medium rounded-full ${config.bgColor} ${config.textColor} ${sizeClass.container}`}
    >
      <span
        className={`rounded-full ${config.dotColor} ${sizeClass.dot}`}
      ></span>
      <span>{config.label}</span>
    </span>
  );
}