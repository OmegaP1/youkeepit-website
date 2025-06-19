// src/app/company/components/ui/OfferStatusBadge.js
'use client';

export default function OfferStatusBadge({ status, size = 'sm' }) {
  const statusConfig = {
    'draft': {
      label: 'Draft',
      color: 'bg-gray-100 text-gray-800',
      dot: 'bg-gray-400'
    },
    'pending-employee': {
      label: 'Pending Employee',
      color: 'bg-yellow-100 text-yellow-800',
      dot: 'bg-yellow-400'
    },
    'pending-wipe': {
      label: 'Pending Wipe',
      color: 'bg-orange-100 text-orange-800',
      dot: 'bg-orange-400'
    },
    'wipe-confirmed': {
      label: 'Wipe Confirmed',
      color: 'bg-blue-100 text-blue-800',
      dot: 'bg-blue-400'
    },
    'payment-pending': {
      label: 'Payment Pending',
      color: 'bg-purple-100 text-purple-800',
      dot: 'bg-purple-400'
    },
    'payment-completed': {
      label: 'Payment Completed',
      color: 'bg-indigo-100 text-indigo-800',
      dot: 'bg-indigo-400'
    },
    'completed': {
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
      dot: 'bg-green-400'
    },
    'cancelled': {
      label: 'Cancelled',
      color: 'bg-red-100 text-red-800',
      dot: 'bg-red-400'
    }
  };

  const config = statusConfig[status] || statusConfig['draft'];
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm'
  };

  const dotSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${config.color} ${sizeClasses[size]}
    `}>
      <span className={`
        rounded-full mr-1.5 flex-shrink-0
        ${config.dot} ${dotSizes[size]}
      `}></span>
      {config.label}
    </span>
  );
}