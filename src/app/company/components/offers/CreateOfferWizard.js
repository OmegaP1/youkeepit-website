// src/app/company/components/offers/CreateOfferWizard.js
'use client';

import { useState } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  User,
  Monitor,
  DollarSign,
  Eye,
  Copy,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function CreateOfferWizard({ onClose, onSuccess, showMessage }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Employee Info
    employeeName: '',
    employeeEmail: '',

    // Device Info
    deviceBrand: '',
    deviceModel: '',
    serialNumber: '',
    condition: 'good',

    // Pricing
    price: '',
    notes: '',
  });

  const [generatedOffer, setGeneratedOffer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deviceBrands = [
    'Apple',
    'Dell',
    'HP',
    'Lenovo',
    'ASUS',
    'Acer',
    'MSI',
    'Microsoft',
    'Other',
  ];

  const deviceConditions = [
    {
      value: 'excellent',
      label: 'Excellent',
      description: 'Like new, minimal wear',
    },
    {
      value: 'good',
      label: 'Good',
      description: 'Minor wear, fully functional',
    },
    {
      value: 'fair',
      label: 'Fair',
      description: 'Visible wear, all features work',
    },
    {
      value: 'poor',
      label: 'Poor',
      description: 'Heavy wear, may have issues',
    },
  ];

  const steps = [
    { id: 1, title: 'Employee', description: 'Employee Information' },
    { id: 2, title: 'Device', description: 'Device Details' },
    { id: 3, title: 'Pricing', description: 'Set Price & Terms' },
    { id: 4, title: 'Review', description: 'Review & Create' },
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOfferCredentials = () => {
    const randomId = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    const sanitizedName = formData.employeeName
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    return {
      id: `OFF-${randomId}`,
      username: `${sanitizedName}_${randomId}`,
      password: `temp_pass_${randomId}`,
      offerLink: `https://offer.keepmykit.com/off-${randomId}`,
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const credentials = generateOfferCredentials();
    const newOffer = {
      ...credentials,
      ...formData,
      status: 'pending_acceptance',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    };

    setGeneratedOffer(newOffer);
    setIsSubmitting(false);
    setCurrentStep(5);
    showMessage('Offer created successfully!', 'success');
  };

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.employeeName.trim() && formData.employeeEmail.trim();
      case 2:
        return formData.deviceBrand && formData.deviceModel.trim();
      case 3:
        return formData.price && parseFloat(formData.price) > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Employee Information
              </h2>
              <p className="text-gray-600">
                Enter the employee details for this device sale offer.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name *
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={e => updateFormData('employeeName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter employee full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Email *
                </label>
                <input
                  type="email"
                  value={formData.employeeEmail}
                  onChange={e =>
                    updateFormData('employeeEmail', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="employee@company.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Device Details
              </h2>
              <p className="text-gray-600">
                Specify the device information and condition.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Brand *
                </label>
                <select
                  value={formData.deviceBrand}
                  onChange={e => updateFormData('deviceBrand', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a brand</option>
                  {deviceBrands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Model *
                </label>
                <input
                  type="text"
                  value={formData.deviceModel}
                  onChange={e => updateFormData('deviceModel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., MacBook Pro 16-inch 2022"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={e => updateFormData('serialNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Device serial number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <div className="space-y-2">
                  {deviceConditions.map(condition => (
                    <label
                      key={condition.value}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={condition.value}
                        checked={formData.condition === condition.value}
                        onChange={e =>
                          updateFormData('condition', e.target.value)
                        }
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {condition.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {condition.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pricing & Terms
              </h2>
              <p className="text-gray-600">
                Set the sale price and any additional notes.
              </p>
            </div>

            <div className="space-y-4">
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
                    value={formData.price}
                    onChange={e => updateFormData('price', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={e => updateFormData('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Any additional information about the device or sale..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Review & Create
              </h2>
              <p className="text-gray-600">
                Review all details before creating the offer.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Employee</h3>
                  <p className="text-gray-700">{formData.employeeName}</p>
                  <p className="text-gray-600 text-sm">
                    {formData.employeeEmail}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Device</h3>
                  <p className="text-gray-700">
                    {formData.deviceBrand} {formData.deviceModel}
                  </p>
                  {formData.serialNumber && (
                    <p className="text-gray-600 text-sm">
                      Serial: {formData.serialNumber}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm">
                    Condition: {formData.condition}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Price</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${formData.price}
                  </p>
                  {formData.notes && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        Notes:
                      </p>
                      <p className="text-sm text-gray-600">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">
                    Before you proceed
                  </h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    This will create a new offer and send credentials to the
                    employee. Make sure all information is correct as some
                    details cannot be changed later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Offer Created Successfully!
              </h2>
              <p className="text-gray-600 mt-2">
                The sale offer has been created. Here are the access details.
              </p>
            </div>

            {generatedOffer && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-medium text-green-900 mb-4">
                    Offer Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Offer ID:</span>
                      <span className="font-bold">{generatedOffer.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Employee:</span>
                      <span className="font-medium">
                        {generatedOffer.employeeName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Device:</span>
                      <span className="font-medium">
                        {generatedOffer.deviceBrand}{' '}
                        {generatedOffer.deviceModel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Price:</span>
                      <span className="font-bold text-green-600">
                        ${generatedOffer.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-medium text-blue-900 mb-4">
                    Access Credentials
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Username:</span>
                      <div className="flex items-center space-x-2">
                        <code className="bg-white px-2 py-1 rounded border">
                          {generatedOffer.username}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              generatedOffer.username
                            );
                            showMessage('Username copied!', 'success');
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Password:</span>
                      <div className="flex items-center space-x-2">
                        <code className="bg-white px-2 py-1 rounded border">
                          {generatedOffer.password}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              generatedOffer.password
                            );
                            showMessage('Password copied!', 'success');
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    // MODAL BACKDROP - THIS WAS MISSING!
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Offer
              </h1>
              <p className="text-gray-600 mt-1">
                Set up a device sale offer for an employee
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          {currentStep <= 4 && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.id < currentStep
                          ? 'bg-green-500 text-white'
                          : step.id === currentStep
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.id < currentStep ? '✓' : step.id}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        step.id <= currentStep
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-4 ${
                          step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div>
              {currentStep > 1 && currentStep <= 4 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {currentStep === 5 ? (
                <button
                  onClick={() => {
                    onSuccess(generatedOffer);
                    onClose();
                  }}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Done
                </button>
              ) : currentStep === 4 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    canProceed() && !isSubmitting
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Offer...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Create Offer</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    canProceed()
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}