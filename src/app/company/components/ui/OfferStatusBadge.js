// src/app/company/components/ui/OfferStatusBadge.js
'use client';

export default function OfferStatusBadge({ status, size = 'sm' }) {
  const getStatusStyles = status => {
    const styles = {
      active: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        dot: 'bg-green-500',
        label: 'Active',
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        dot: 'bg-yellow-500',
        label: 'Pending',
      },
      completed: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        dot: 'bg-blue-500',
        label: 'Completed',
      },
      expired: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        dot: 'bg-red-500',
        label: 'Expired',
      },
      draft: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        dot: 'bg-gray-500',
        label: 'Draft',
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        dot: 'bg-red-500',
        label: 'Cancelled',
      },
      processing: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        dot: 'bg-purple-500',
        label: 'Processing',
      },
    };
    return styles[status] || styles.draft;
  };

  const getSizeStyles = size => {
    return {
      xs: {
        container: 'px-2 py-1 text-xs',
        dot: 'w-1 h-1',
      },
      sm: {
        container: 'px-2 py-1 text-xs',
        dot: 'w-1.5 h-1.5',
      },
      md: {
        container: 'px-3 py-1.5 text-sm',
        dot: 'w-2 h-2',
      },
      lg: {
        container: 'px-4 py-2 text-sm',
        dot: 'w-2.5 h-2.5',
      },
    }[size];
  };

  const statusStyle = getStatusStyles(status);
  const sizeStyle = getSizeStyles(size);

  return (
    <span
      className={`
        inline-flex items-center space-x-1.5 rounded-full font-medium
        ${statusStyle.bg} ${statusStyle.text} ${sizeStyle.container}
      `}
    >
      <span
        className={`rounded-full ${statusStyle.dot} ${sizeStyle.dot}`}
      ></span>
      <span>{statusStyle.label}</span>
    </span>
  );
}