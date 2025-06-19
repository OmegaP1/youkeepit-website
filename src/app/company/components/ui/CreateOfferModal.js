// src/app/company/components/ui/CreateOfferModal.js
'use client';

import { useState } from 'react';
import {
  X,
  User,
  Mail,
  Monitor,
  DollarSign,
  FileText,
  AlertTriangle,
} from 'lucide-react';

export default function CreateOfferModal({ onClose, onSubmit, showMessage }) {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    department: '',
    deviceName: '',
    deviceModel: '',
    originalPrice: '',
    salePrice: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'HR',
    'Finance',
    'Operations',
    'IT',
    'Legal',
    'Customer Support',
  ];

  const validateForm = () => {
    const newErrors = {};

    // Employee validation
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required';
    }

    if (!formData.employeeEmail.trim()) {
      newErrors.employeeEmail = 'Employee email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.employeeEmail)) {
      newErrors.employeeEmail = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department selection is required';
    }

    // Device validation
    if (!formData.deviceName.trim()) {
      newErrors.deviceName = 'Device name is required';
    }

    if (!formData.deviceModel.trim()) {
      newErrors.deviceModel = 'Device model is required';
    }

    // Pricing validation
    const originalPrice = parseFloat(formData.originalPrice);
    const salePrice = parseFloat(formData.salePrice);

    if (!formData.originalPrice || originalPrice <= 0) {
      newErrors.originalPrice = 'Valid original price is required';
    }

    if (!formData.salePrice || salePrice <= 0) {
      newErrors.salePrice = 'Valid sale price is required';
    }

    // Check if sale price is less than original price
    if (originalPrice > 0 && salePrice > 0 && salePrice >= originalPrice) {
      newErrors.salePrice = 'Sale price must be less than original price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      showMessage?.('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const offerData = {
        ...formData,
        originalPrice: parseFloat(formData.originalPrice),
        salePrice: parseFloat(formData.salePrice),
        id: `OF-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, '0')}`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        views: 0,
      };

      onSubmit(offerData);
      showMessage?.('Offer created successfully!', 'success');
      onClose();
    } catch (error) {
      showMessage?.('Failed to create offer. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDiscount = () => {
    const original = parseFloat(formData.originalPrice);
    const sale = parseFloat(formData.salePrice);

    if (original > 0 && sale > 0 && sale < original) {
      return Math.round(((original - sale) / original) * 100);
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Offer
              </h2>
              <p className="text-gray-600 mt-1">
                Set up a device sale offer for an employee
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Employee Information Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Employee Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name *
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={e =>
                    handleInputChange('employeeName', e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.employeeName
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                  disabled={isSubmitting}
                />
                {errors.employeeName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.employeeName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.employeeEmail}
                    onChange={e =>
                      handleInputChange('employeeEmail', e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.employeeEmail
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="employee@company.com"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.employeeEmail && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.employeeEmail}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={e => handleInputChange('department', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.department
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Device Information Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Device Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Name *
                </label>
                <input
                  type="text"
                  value={formData.deviceName}
                  onChange={e =>
                    handleInputChange('deviceName', e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.deviceName
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g. MacBook Pro, HP Laptop"
                  disabled={isSubmitting}
                />
                {errors.deviceName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.deviceName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Model *
                </label>
                <input
                  type="text"
                  value={formData.deviceModel}
                  onChange={e =>
                    handleInputChange('deviceModel', e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.deviceModel
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g. 13-inch M2, EliteBook 840"
                  disabled={isSubmitting}
                />
                {errors.deviceModel && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.deviceModel}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Information Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Pricing Information
              </h3>
            </div>

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
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={e =>
                      handleInputChange('originalPrice', e.target.value)
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.originalPrice
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    disabled={isSubmitting}
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
                    step="0.01"
                    min="0"
                    value={formData.salePrice}
                    onChange={e =>
                      handleInputChange('salePrice', e.target.value)
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.salePrice
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.salePrice && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.salePrice}
                  </p>
                )}

                {/* Discount Display */}
                {calculateDiscount() > 0 && (
                  <p className="text-green-600 text-sm mt-1 font-medium">
                    {calculateDiscount()}% discount
                  </p>
                )}
              </div>
            </div>

            {/* Pricing Validation Warning */}
            {formData.originalPrice &&
              formData.salePrice &&
              parseFloat(formData.salePrice) >=
                parseFloat(formData.originalPrice) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800 text-sm">
                      Sale price must be less than original price
                    </p>
                  </div>
                </div>
              )}
          </div>

          {/* Additional Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Additional Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={e => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Any special conditions, pickup instructions, or additional information..."
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Offer Terms */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Offer Terms & Conditions
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Offer expires in 7 days from creation date</li>
              <li>• Employee must sign waiver and confirm device condition</li>
              <li>• Device data will be securely wiped before handover</li>
              <li>
                • Payment processed after device verification and handover
              </li>
              <li>• Offer can be cancelled before employee acceptance</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Offer...</span>
                </>
              ) : (
                <>
                  <span>Create Offer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}