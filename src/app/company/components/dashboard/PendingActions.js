// src/app/company/components/dashboard/PendingActions.js
'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Clock, CreditCard, CheckCircle, ExternalLink } from 'lucide-react';

export default function PendingActions({ onTabChange }) {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching pending actions
    const fetchActions = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActions([
        {
          id: 1,
          type: 'wipe-confirmation',
          title: 'Device wipe confirmation needed',
          description: 'MacBook Pro (Serial: MP2023001) requires IT confirmation',
          urgency: 'high',
          offerId: 'OFF-002',
          employeeName: 'Sarah Johnson',
          icon: AlertCircle,
          actionText: 'Confirm Wipe'
        },
        {
          id: 2,
          type: 'payment-overdue',
          title: 'Payment overdue',
          description: 'iPad Pro payment is 2 days overdue',
          urgency: 'medium',
          offerId: 'OFF-003',
          employeeName: 'Mike Davis',
          icon: CreditCard,
          actionText: 'Send Reminder'
        },
        {
          id: 3,
          type: 'employee-response',
          title: 'Awaiting employee response',
          description: 'Dell XPS offer sent 3 days ago, no response',
          urgency: 'low',
          offerId: 'OFF-004',
          employeeName: 'Emily Chen',
          icon: Clock,
          actionText: 'Follow Up'
        },
        {
          id: 4,
          type: 'handover-ready',
          title: 'Ready for handover',
          description: 'Surface Pro payment completed, ready for pickup',
          urgency: 'medium',
          offerId: 'OFF-005',
          employeeName: 'Alex Rodriguez',
          icon: CheckCircle,
          actionText: 'Schedule Handover'
        },
        {
          id: 5,
          type: 'price-approval',
          title: 'Price approval needed',
          description: 'Custom pricing for iPhone 14 Pro requires approval',
          urgency: 'low',
          offerId: 'OFF-006',
          employeeName: 'Lisa Wang',
          icon: AlertCircle,
          actionText: 'Review Pricing'
        }
      ]);
      setLoading(false);
    };

    fetchActions();
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getIconColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onTabChange('offers')}
            >
              <div className={`p-2 rounded-full ${getUrgencyColor(action.urgency)}`}>
                <Icon className={`h-4 w-4 ${getIconColor(action.urgency)}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {action.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {action.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-xs text-gray-400">
                        {action.offerId} • {action.employeeName}
                      </span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full font-medium
                        ${action.urgency === 'high' ? 'bg-red-100 text-red-700' : ''}
                        ${action.urgency === 'medium' ? 'bg-orange-100 text-orange-700' : ''}
                        ${action.urgency === 'low' ? 'bg-yellow-100 text-yellow-700' : ''}
                      `}>
                        {action.urgency} priority
                      </span>
                    </div>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center ml-4">
                    {action.actionText}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {actions.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No pending actions</p>
            <p className="text-gray-400 text-xs">All tasks are up to date!</p>
          </div>
        )}
      </div>
    </div>
  );
}