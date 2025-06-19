// src/app/company/components/offers/OffersManager.js
'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Copy,
  Download,
  Monitor,
  User,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import OfferStatusBadge from '../ui/OfferStatusBadge';
import CreateOfferWizard from './CreateOfferWizard';

export default function OffersManager({ showMessage }) {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock offers data
  const offers = [
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
    {
      id: 'OFF-002',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@company.com',
      deviceBrand: 'Dell',
      deviceModel: 'XPS 13 Plus',
      serialNumber: 'EFGH2345678901',
      price: 420,
      status: 'wipe_confirmed',
      createdAt: '2024-06-19T08:15:00Z',
      expiresAt: '2024-06-26T08:15:00Z',
      offerLink: 'https://offer.keepmykit.com/off-002',
      username: 'sarah_johnson_002',
      password: 'temp_pass_002',
    },
    {
      id: 'OFF-003',
      employeeName: 'Mike Wilson',
      employeeEmail: 'mike.wilson@company.com',
      deviceBrand: 'Lenovo',
      deviceModel: 'ThinkPad X1 Carbon Gen 10',
      serialNumber: 'IJKL3456789012',
      price: 520,
      status: 'completed',
      createdAt: '2024-06-18T14:20:00Z',
      expiresAt: '2024-06-25T14:20:00Z',
      offerLink: 'https://offer.keepmykit.com/off-003',
      username: 'mike_wilson_003',
      password: 'temp_pass_003',
    },
    {
      id: 'OFF-004',
      employeeName: 'Emma Davis',
      employeeEmail: 'emma.davis@company.com',
      deviceBrand: 'Apple',
      deviceModel: 'MacBook Air M2',
      serialNumber: 'MNOP4567890123',
      price: 680,
      status: 'pending_acceptance',
      createdAt: '2024-06-17T16:45:00Z',
      expiresAt: '2024-06-24T16:45:00Z',
      offerLink: 'https://offer.keepmykit.com/off-004',
      username: 'emma_davis_004',
      password: 'temp_pass_004',
    },
  ];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch =
      offer.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.deviceModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const copyToClipboard = (text, type) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showMessage(`${type} copied to clipboard!`, 'success');
    } else {
      showMessage('Clipboard not available', 'error');
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'pending_acceptance':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'pending_wipe':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'wipe_confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  if (showCreateWizard) {
    return (
      <CreateOfferWizard
        onClose={() => setShowCreateWizard(false)}
        onSuccess={newOffer => {
          setShowCreateWizard(false);
          showMessage(`Offer ${newOffer.id} created successfully!`, 'success');
        }}
        showMessage={showMessage}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sale Offers</h1>
          <p className="text-gray-600 mt-1">
            Create and manage device sale offers for employees.
          </p>
        </div>
        <button
          onClick={() => setShowCreateWizard(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search offers, employees, or devices..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending_acceptance">Pending Acceptance</option>
              <option value="pending_wipe">Pending Wipe</option>
              <option value="wipe_confirmed">Wipe Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOffers.map(offer => (
          <div
            key={offer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-lg text-gray-900">
                  {offer.id}
                </span>
                <OfferStatusBadge status={offer.status} />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(offer.offerLink, 'Offer link')}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy offer link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    showMessage(`Viewing offer ${offer.id}`, 'info')
                  }
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    showMessage(`Editing offer ${offer.id}`, 'info')
                  }
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit offer"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Employee Info */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {offer.employeeName}
                </span>
              </div>
              <p className="text-sm text-gray-600 pl-6">
                {offer.employeeEmail}
              </p>
            </div>

            {/* Device Info */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Monitor className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {offer.deviceBrand} {offer.deviceModel}
                </span>
              </div>
              <p className="text-sm text-gray-600 pl-6">
                Serial: {offer.serialNumber}
              </p>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="font-bold text-xl text-green-600">
                  ${offer.price}
                </span>
              </div>
            </div>

            {/* Login Credentials */}
            <div className="mb-4 bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">
                Employee Access
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Username:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-white px-2 py-1 rounded border">
                      {offer.username}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(offer.username, 'Username')
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Password:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-white px-2 py-1 rounded border">
                      {offer.password}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(offer.password, 'Password')
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Created: {formatDate(offer.createdAt)}</span>
              </div>
              <span>Expires: {formatDate(offer.expiresAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No offers found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Create your first device sale offer to get started.'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setShowCreateWizard(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Create First Offer
            </button>
          )}
        </div>
      )}
    </div>
  );
}