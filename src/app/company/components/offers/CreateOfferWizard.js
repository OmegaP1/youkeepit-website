// src/app/company/components/offers/CreateOfferWizard.js
'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, Laptop, DollarSign, Send } from 'lucide-react';

export default function CreateOfferWizard({ showMessage, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Employee Information
    employeeName: '',
    employeeEmail: '',
    employeeDepartment: '',
    employeeId: '',
    
    // Device Information
    deviceType: '',
    deviceBrand: '',
    deviceModel: '',
    serialNumber: '',
    condition: '',
    purchaseDate: '',
    
    // Pricing
    originalPrice: '',
    suggestedPrice: '',
    finalPrice: '',
    priceReason: '',
    
    // Offer Settings
    offerExpiry: '',
    includeAccessories: false,
    notes: ''
  });

  const steps = [
    { id: 1, title: 'Employee Info', icon: User },
    { id: 2, title: 'Device Details', icon: Laptop },
    { id: 3, title: 'Pricing', icon: DollarSign },
    { id: 4, title: 'Review & Send', icon: Send }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showMessage('Offer created successfully and sent to employee!', 'success');
      onComplete();
    } catch (error) {
      showMessage('Failed to create offer. Please try again.', 'error');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Employee Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name *
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => updateFormData('employeeName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="EMP001"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Device Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Type *
                </label>
                <select
                  value={formData.deviceType}
                  onChange={(e) => updateFormData('deviceType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Device Type</option>
                  <option value="laptop">Laptop</option>
                  <option value="desktop">Desktop</option>
                  <option value="tablet">Tablet</option>
                  <option value="phone">Phone</option>
                  <option value="monitor">Monitor</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <select
                  value={formData.deviceBrand}
                  onChange={(e) => updateFormData('deviceBrand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Brand</option>
                  <option value="apple">Apple</option>
                  <option value="dell">Dell</option>
                  <option value="hp">HP</option>
                  <option value="lenovo">Lenovo</option>
                  <option value="microsoft">Microsoft</option>
                  <option value="samsung">Samsung</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  value={formData.deviceModel}
                  onChange={(e) => updateFormData('deviceModel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MacBook Pro 13\ 2022"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number *
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => updateFormData('serialNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABC123XYZ"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => updateFormData('condition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => updateFormData('purchaseDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Pricing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Purchase Price
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => updateFormData('originalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Sale Price
                </label>
                <input
                  type="number"
                  value={formData.suggestedPrice}
                  onChange={(e) => updateFormData('suggestedPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Offer Price *
                </label>
                <input
                  type="number"
                  value={formData.finalPrice}
                  onChange={(e) => updateFormData('finalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.offerExpiry}
                  onChange={(e) => updateFormData('offerExpiry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Reason/Notes
                </label>
                <textarea
                  value={formData.priceReason}
                  onChange={(e) => updateFormData('priceReason', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain the pricing rationale..."
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeAccessories"
                    checked={formData.includeAccessories}
                    onChange={(e) => updateFormData('includeAccessories', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="includeAccessories" className="ml-2 block text-sm text-gray-900">
                    Include accessories (charger, case, etc.)
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review & Send Offer</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Employee Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Name: {formData.employeeName}</div>
                    <div>Email: {formData.employeeEmail}</div>
                    <div>Department: {formData.employeeDepartment}</div>
                    <div>ID: {formData.employeeId}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Device Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Type: {formData.deviceType}</div>
                    <div>Brand: {formData.deviceBrand}</div>
                    <div>Model: {formData.deviceModel}</div>
                    <div>Serial: {formData.serialNumber}</div>
                    <div>Condition: {formData.condition}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Original Price: ${formData.originalPrice}</div>
                    <div>Suggested Price: ${formData.suggestedPrice}</div>
                    <div className="font-medium text-gray-900">Final Price: ${formData.finalPrice}</div>
                    <div>Expires: {formData.offerExpiry}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Additional Options</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Accessories: {formData.includeAccessories ? 'Included' : 'Not included'}</div>
                    {formData.priceReason && <div>Notes: {formData.priceReason}</div>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>• Employee will receive an email with the offer details</div>
                <div>• They can accept or decline the offer through a secure link</div>
                <div>• You'll be notified of their response and next steps</div>
                <div>• Device data wiping will be initiated upon acceptance</div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Offer</h1>
          <p className="text-gray-600">Set up a device sale offer for an employee</p>
        </div>
        <button
          onClick={onComplete}
          className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Offers</span>
        </button>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${isActive ? 'border-blue-600 bg-blue-600 text-white' : ''}
                  ${isCompleted ? 'border-green-600 bg-green-600 text-white' : ''}
                  ${!isActive && !isCompleted ? 'border-gray-300 text-gray-500' : ''}
                `}>
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    Step {step.id}
                  </div>
                  <div className={`text-sm ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-6 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors
            ${currentStep === 1 
              ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={nextStep}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Send Offer</span>
          </button>
        )}
      </div>
    </div>
  );
}