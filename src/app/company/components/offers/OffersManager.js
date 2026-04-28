// src/app/company/components/offers/OffersManager.js
'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Copy,
  MoreHorizontal,
  X,
  Calendar,
  DollarSign,
  User,
  Smartphone,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import OfferStatusBadge from '../ui/OfferStatusBadge';

export default function OffersManager({ showMessage }) {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sample offers data - replace with real API calls
  const [offers, setOffers] = useState([
    {
      id: 'OF-001',
      employee: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@company.com',
      device: 'iPhone 14 Pro',
      deviceModel: 'A2894',
      price: 899,
      originalPrice: 1099,
      status: 'active',
      created: '2024-06-19T10:30:00Z',
      expires: '2024-07-19T10:30:00Z',
      offerLink: 'https://app.company.com/offers/of-001',
      views: 12,
      department: 'Engineering',
    },
    {
      id: 'OF-002',
      employee: 'Mike Chen',
      employeeEmail: 'mike.chen@company.com',
      device: 'Samsung Galaxy S24',
      deviceModel: 'SM-S921U',
      price: 749,
      originalPrice: 949,
      status: 'pending',
      created: '2024-06-19T08:15:00Z',
      expires: '2024-07-19T08:15:00Z',
      offerLink: 'https://app.company.com/offers/of-002',
      views: 8,
      department: 'Marketing',
    },
    {
      id: 'OF-003',
      employee: 'Emily Davis',
      employeeEmail: 'emily.davis@company.com',
      device: 'iPad Air',
      deviceModel: 'A2316',
      price: 599,
      originalPrice: 799,
      status: 'completed',
      created: '2024-06-18T14:20:00Z',
      expires: '2024-07-18T14:20:00Z',
      offerLink: 'https://app.company.com/offers/of-003',
      views: 25,
      department: 'Sales',
    },
    {
      id: 'OF-004',
      employee: 'James Wilson',
      employeeEmail: 'james.wilson@company.com',
      device: 'MacBook Pro 13"',
      deviceModel: 'A2338',
      price: 1299,
      originalPrice: 1599,
      status: 'active',
      created: '2024-06-17T16:45:00Z',
      expires: '2024-07-17T16:45:00Z',
      offerLink: 'https://app.company.com/offers/of-004',
      views: 18,
      department: 'Design',
    },
    {
      id: 'OF-005',
      employee: 'Lisa Rodriguez',
      employeeEmail: 'lisa.rodriguez@company.com',
      device: 'Surface Laptop 5',
      deviceModel: 'RBG-00024',
      price: 899,
      originalPrice: 1199,
      status: 'expired',
      created: '2024-06-15T11:00:00Z',
      expires: '2024-06-20T11:00:00Z',
      offerLink: 'https://app.company.com/offers/of-005',
      views: 5,
      department: 'HR',
    },
    {
      id: 'OF-006',
      employee: 'David Park',
      employeeEmail: 'david.park@company.com',
      device: 'iPhone 13',
      deviceModel: 'A2633',
      price: 629,
      originalPrice: 829,
      status: 'draft',
      created: '2024-06-19T12:00:00Z',
      expires: '2024-07-19T12:00:00Z',
      offerLink: 'https://app.company.com/offers/of-006',
      views: 0,
      department: 'Finance',
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and sort offers
  const filteredOffers = offers
    .filter(offer => {
      const matchesSearch =
        offer.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || offer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'created') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const copyToClipboard = async (text, type = 'Link') => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage && showMessage(`${type} copied to clipboard!`, 'success');
    } catch (err) {
      showMessage &&
        showMessage(`Failed to copy ${type.toLowerCase()}`, 'error');
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountPercentage = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const handleCreateOffer = formData => {
    const newOffer = {
      id: `OF-${String(offers.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'draft',
      created: new Date().toISOString(),
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      offerLink: `https://app.company.com/offers/of-${String(offers.length + 1).padStart(3, '0')}`,
      views: 0,
    };

    setOffers([newOffer, ...offers]);
    setShowCreateModal(false);
    showMessage && showMessage('Offer created successfully!', 'success');
  };

  const handleDeleteOffer = offerId => {
    setOffers(offers.filter(offer => offer.id !== offerId));
    showMessage && showMessage('Offer deleted successfully!', 'success');
  };

  const handleBulkAction = action => {
    if (selectedOffers.length === 0) {
      showMessage && showMessage('Please select offers first', 'warning');
      return;
    }

    showMessage &&
      showMessage(
        `${action} applied to ${selectedOffers.length} offers`,
        'success'
      );
    setSelectedOffers([]);
  };

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Offers Management
          </h1>
          <p className="text-gray-600">
            Manage device sale offers for your employees
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search offers, employees, or devices..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={e => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="created-desc">Newest First</option>
              <option value="created-asc">Oldest First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="employee-asc">Employee A-Z</option>
              <option value="employee-desc">Employee Z-A</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {offers.filter(o => o.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {offers.filter(o => o.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {offers.filter(o => o.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {offers.filter(o => o.status === 'expired').length}
            </p>
            <p className="text-sm text-gray-600">Expired</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">
              {offers.filter(o => o.status === 'draft').length}
            </p>
            <p className="text-sm text-gray-600">Draft</p>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOffers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedOffers.length} offers selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('Export')}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => handleBulkAction('Archive')}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                Archive
              </button>
              <button
                onClick={() => setSelectedOffers([])}
                className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOffers.map(offer => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onCopy={copyToClipboard}
            onDelete={handleDeleteOffer}
            onSelect={selected => {
              if (selected) {
                setSelectedOffers([...selectedOffers, offer.id]);
              } else {
                setSelectedOffers(selectedOffers.filter(id => id !== offer.id));
              }
            }}
            isSelected={selectedOffers.includes(offer.id)}
            showMessage={showMessage}
            formatDate={formatDate}
            formatPrice={formatPrice}
            getDiscountPercentage={getDiscountPercentage}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No offers found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first device offer to get started'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Create New Offer
            </button>
          )}
        </div>
      )}

      {/* Create Offer Modal */}
      {showCreateModal && (
        <CreateOfferModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateOffer}
          showMessage={showMessage}
        />
      )}
    </div>
  );
}

// Offer Card Component
function OfferCard({
  offer,
  onCopy,
  onDelete,
  onSelect,
  isSelected,
  showMessage,
  formatDate,
  formatPrice,
  getDiscountPercentage,
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={e => onSelect(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="font-bold text-lg text-gray-900">{offer.id}</span>
            <OfferStatusBadge status={offer.status} />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => {
                    onCopy(offer.offerLink, 'Offer link');
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => {
                    showMessage(`Viewing offer ${offer.id}`, 'info');
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => {
                    showMessage(`Editing offer ${offer.id}`, 'info');
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Offer</span>
                </button>
                <button
                  onClick={() => {
                    window.open(offer.offerLink, '_blank');
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Link</span>
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you want to delete offer ${offer.id}?`
                      )
                    ) {
                      onDelete(offer.id);
                    }
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Employee Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{offer.employee}</p>
            <p className="text-sm text-gray-600">{offer.department}</p>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">{offer.device}</p>
                <p className="text-sm text-gray-600">
                  Model: {offer.deviceModel}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(offer.price)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(offer.originalPrice)}
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                {getDiscountPercentage(offer.originalPrice, offer.price)}% off
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Created {formatDate(offer.created)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{offer.views} views</span>
            </span>
          </div>
          <span className="text-xs">Expires {formatDate(offer.expires)}</span>
        </div>
      </div>
    </div>
  );
}

// Create Offer Modal Component
function CreateOfferModal({ onClose, onSubmit, showMessage }) {
  const [formData, setFormData] = useState({
    employee: '',
    employeeEmail: '',
    device: '',
    deviceModel: '',
    originalPrice: '',
    price: '',
    department: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee.trim())
      newErrors.employee = 'Employee name is required';
    if (!formData.employeeEmail.trim())
      newErrors.employeeEmail = 'Employee email is required';
    if (!formData.device.trim()) newErrors.device = 'Device name is required';
    if (!formData.originalPrice || formData.originalPrice <= 0)
      newErrors.originalPrice = 'Valid original price is required';
    if (!formData.price || formData.price <= 0)
      newErrors.price = 'Valid sale price is required';
    if (formData.price >= formData.originalPrice)
      newErrors.price = 'Sale price must be less than original price';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        originalPrice: Number(formData.originalPrice),
        price: Number(formData.price),
      });
    } else {
      showMessage && showMessage('Please fix the errors in the form', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Offer
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Employee Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Employee Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name *
                </label>
                <input
                  type="text"
                  value={formData.employee}
                  onChange={e =>
                    setFormData({ ...formData, employee: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.employee
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-transparent'
                  }`}
                  placeholder="Enter employee name"
                />
                {errors.employee && (
                  <p className="text-red-600 text-sm mt-1">{errors.employee}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Email *
                </label>
                <input
                  type="email"
                  value={formData.employeeEmail}
                  onChange={e =>
                    setFormData({ ...formData, employeeEmail: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.employeeEmail
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-transparent'
                  }`}
                  placeholder="employee@company.com"
                />
                {errors.employeeEmail && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.employeeEmail}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={formData.department}
                onChange={e =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Design">Design</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>

          {/* Device Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Device Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Name *
                </label>
                <input
                  type="text"
                  value={formData.device}
                  onChange={e =>
                    setFormData({ ...formData, device: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.device
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-transparent'
                  }`}
                  placeholder="iPhone 14 Pro, MacBook Air, etc."
                />
                {errors.device && (
                  <p className="text-red-600 text-sm mt-1">{errors.device}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Model
                </label>
                <input
                  type="text"
                  value={formData.deviceModel}
                  onChange={e =>
                    setFormData({ ...formData, deviceModel: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="A2894, SM-S921U, etc."
                />
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Pricing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value,
                      })
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.originalPrice
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-transparent'
                    }`}
                    placeholder="1099.00"
                  />
                </div>
                {errors.originalPrice && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.originalPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.price
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-transparent'
                    }`}
                    placeholder="899.00"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Discount Preview */}
            {formData.originalPrice &&
              formData.price &&
              formData.price < formData.originalPrice && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">
                      Discount Preview
                    </span>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {Math.round(
                          ((formData.originalPrice - formData.price) /
                            formData.originalPrice) *
                            100
                        )}
                        % off
                      </span>
                      <p className="text-sm text-green-600 mt-1">
                        Employee saves $
                        {(formData.originalPrice - formData.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Create Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}