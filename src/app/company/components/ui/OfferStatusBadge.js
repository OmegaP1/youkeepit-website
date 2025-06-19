// src/app/company/components/ui/OfferStatusBadge.js
'use client';

import {
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  Shield,
  Mail,
} from 'lucide-react';

export default function OfferStatusBadge({ status }) {
  const getStatusConfig = status => {
    switch (status) {
      case 'pending_acceptance':
        return {
          label: 'Pending Acceptance',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Mail,
          description: 'Waiting for employee to accept offer',
        };
      case 'pending_wipe':
        return {
          label: 'Pending Wipe',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Shield,
          description: 'Employee accepted, waiting for device wipe',
        };
      case 'wipe_confirmed':
        return {
          label: 'Wipe Confirmed',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: CheckCircle,
          description: 'Device wipe confirmed, ready for payment',
        };
      case 'payment_pending':
        return {
          label: 'Payment Pending',
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: DollarSign,
          description: 'Processing payment to employee',
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          description: 'Offer completed successfully',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          description: 'Offer was cancelled',
        };
      case 'expired':
        return {
          label: 'Expired',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          description: 'Offer has expired',
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertCircle,
          description: 'Unknown status',
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className="group relative">
      <span
        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {config.description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}