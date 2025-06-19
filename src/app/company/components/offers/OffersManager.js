// src/app/company/components/offers/OffersManager.js
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';
import OfferStatusBadge from '../ui/OfferStatusBadge';

export default function OffersManager({ showMessage }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOffers([
        {
          id: 'OFF-001',
          employeeName: 'John Smith',
          employeeEmail: 'john.smith@company.com',
          deviceName: 'MacBook Pro 13" 2022',
          serialNumber: 'MP2022001',
          price: 1200,
          status: 'completed',
          createdAt: '2024-06-15T10:30:00Z',
          updatedAt: '2024-06-16T14:45:00Z',
          offerUrl: 'https://app.keepmykit.com/offer/abc123'
        },
        {
          id: 'OFF-002',
          employeeName: 'Sarah Johnson',
          employeeEmail: 'sarah.johnson@company.com',
          deviceName: 'iPhone 13 Pro 256GB',
          serialNumber: 'IP2023002',
          price: 650,
          status: 'pending-wipe',
          createdAt: '2024-06-14T09:15:00Z',
          updatedAt: '2024-06-14T09:15:00Z',
          offerUrl: 'https://app.keepmykit.com/offer/def456'
        },
        {
          id: 'OFF-003',
          employeeName: 'Mike Davis',
          employeeEmail: 'mike.davis@company.com',
          deviceName: 'iPad Pro 11" 2023',
          serialNumber: 'IP2023003',
          price: 450,
          status: 'payment-pending',
          createdAt: '2024-06-14T11:20:00Z',
          updatedAt: '2024-06-15T16:30:00Z',
          offerUrl: 'https://app.keepmykit.com/offer/ghi789'
        },
        {
          id: 'OFF-004',
          employeeName: 'Emily Chen',
          employeeEmail: 'emily.chen@company.com',
          deviceName: 'Dell XPS 13 2022',
          serialNumber: 'DX2022004',
          price: 800,
          status: 'pending-employee',
          createdAt: '2024-06-13T15:45:00Z',
          updatedAt: '2024-06-13T15:45:00Z',
          offerUrl: 'https://app.keepmykit.com/offer/jkl012'
        },
        {
          id: 'OFF-005',
          employeeName: 'Alex Rodriguez',
          employeeEmail: 'alex.rodriguez@company.com',
          deviceName: 'Surface Pro 8',
          serialNumber: 'SP2023005',
          price: 550,
          status: 'wipe-confirmed',
          createdAt: '2024-06-13T08:30:00Z',
          updatedAt: '2024-06-14T12:15:00Z',
          offerUrl: 'https://app.keepmykit.com/offer/mno345'
        }
      ]);
    } catch (error) {
      showMessage('Error loading offers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'employee':
        return a.employeeName.localeCompare(b.employeeName);
      default:
        return 0;
    }
  });

  const handleViewOffer = (offer) => {
    window.open(offer.offerUrl, '_blank');
  };

  const handleEditOffer = (offer) => {
    showMessage(`Edit offer ${offer.id} functionality coming soon`, 'info');
  };

  const handleDeleteOffer = (offer) => {
    if (window.confirm(`Are you sure you want to delete offer ${offer.id}?`)) {
      setOffers(offers.filter(o => o.id !== offer.id));
      showMessage(`Offer ${offer.id} deleted successfully`, 'success');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sale Offers</h1>
          <p className="text-gray-600">Manage device sale offers for employees</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending-employee">Pending Employee</option>
                <option value="pending-wipe">Pending Wipe</option>
                <option value="wipe-confirmed">Wipe Confirmed</option>
                <option value="payment-pending">Payment Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="employee">Employee A-Z</option>
            </select>

            {/* Export */}
            <button className="border border-gray-300 rounded-lg px-3 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Offer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{offer.id}</div>
                      <div className="text-gray-500">SN: {offer.serialNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{offer.employeeName}</div>
                      <div className="text-gray-500">{offer.employeeEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{offer.deviceName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${offer.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OfferStatusBadge status={offer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(offer.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewOffer(offer)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                        title="View Offer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditOffer(offer)}
                        className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded"
                        title="Edit Offer"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Delete Offer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 'No offers match your filters' : 'No offers created yet'}
            </div>
            {!searchTerm && statusFilter === 'all' && (
              <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                Create your first offer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-900">{offers.length}</div>
          <div className="text-sm text-gray-600">Total Offers</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">
            {offers.filter(o => o.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-orange-600">
            {offers.filter(o => ['pending-wipe', 'wipe-confirmed', 'payment-pending'].includes(o.status)).length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-900">
            ${offers.reduce((sum, o) => sum + o.price, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Value</div>
        </div>
      </div>
    </div>
  );
}