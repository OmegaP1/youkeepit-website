// src/hooks/useOffers.js
'use client';

import { useState, useEffect } from 'react';

export function useOffers() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - replace with actual API calls
  const mockOffers = [
    {
      id: 'OFF-001',
      employeeName: 'John Smith',
      employeeEmail: 'john.smith@company.com',
      deviceBrand: 'Apple',
      deviceModel: 'MacBook Pro 16" 2022',
      serialNumber: 'ABCD1234567890',
      price: 850,
      status: 'pending_wipe',
      createdAt: '2024-06-19T10:30:00Z',
      expiresAt: '2024-06-26T10:30:00Z',
      offerLink: 'https://offer.keepmykit.com/off-001',
      username: 'john_smith_001',
      password: 'temp_pass_001',
    },
  ];

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOffers(mockOffers);
      } catch (err) {
        setError('Failed to fetch offers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const createOffer = async offerData => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newOffer = {
        id: `OFF-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, '0')}`,
        ...offerData,
        status: 'pending_acceptance',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      setOffers(prev => [newOffer, ...prev]);
      return { success: true, offer: newOffer };
    } catch (error) {
      return { success: false, error: 'Failed to create offer' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateOfferStatus = async (offerId, status) => {
    try {
      setOffers(prev =>
        prev.map(offer => (offer.id === offerId ? { ...offer, status } : offer))
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update offer' };
    }
  };

  return {
    offers,
    isLoading,
    error,
    createOffer,
    updateOfferStatus,
  };
}
