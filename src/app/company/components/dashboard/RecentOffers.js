// src/app/company/components/dashboard/RecentOffers.js
'use client';

import { useState, useEffect } from 'react';
import OfferStatusBadge from '../ui/OfferStatusBadge';

export default function RecentOffers({ onTabChange }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recent offers
    const fetchOffers = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setOffers([
        {
          id: 'OFF-001',
          employeeName: 'John Smith',
          deviceName: 'MacBook Pro 13"',
          price: '$1,200',
          status: 'completed',
          createdAt: '2024-06-15'
        },
        {
          id: 'OFF-002',
          employeeName: 'Sarah Johnson',
          deviceName: 'iPhone 13 Pro',
          price: '$650',
          status: 'pending-wipe',
          createdAt: '2024-06-14'
        },
        {
          id: 'OFF-003',
          employeeName: 'Mike Davis',
          deviceName: 'iPad Pro 11"',
          price: '$450',
          status: 'payment-pending',
          createdAt: '2024-06-14'
        },
        {
          id: 'OFF-004',
          employeeName: 'Emily Chen',
          deviceName: 'Dell XPS 13',
          price: '$800',
          status: 'pending-employee',
          createdAt: '2024-06-13'
        },
        {
          id: 'OFF-005',
          employeeName: 'Alex Rodriguez',
          deviceName: 'Surface Pro 8',
          price: '$550',
          status: 'wipe-confirmed',
          createdAt: '2024-06-13'
        }
      ]);
      setLoading(false);
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
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
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            onClick={() => onTabChange('offers')}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {offer.employeeName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {offer.deviceName} • {offer.price}
                  </p>
                  <p className="text-xs text-gray-400">
                    {offer.id} • {new Date(offer.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <OfferStatusBadge status={offer.status} />
              </div>
            </div>
          </div>
        ))}
        
        {offers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No recent offers found</p>
            <button
              onClick={() => onTabChange('create-offer')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              Create your first offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}