// src/app/admin/components/benefits/components/BenefitForm.js
"use client";

import { useState, useEffect } from "react";

export default function BenefitForm({ benefit, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    label: '',
    icon: '',
    color: 'text-blue-600',
    order_index: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (benefit) {
      setFormData({
        title: benefit.title || '',
        description: benefit.description || '',
        value: benefit.value || '',
        label: benefit.label || '',
        icon: benefit.icon || '',
        color: benefit.color || 'text-blue-600',
        order_index: benefit.order_index || 0
      });
    }
  }, [benefit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    setSaving(false);
    
    if (success) {
      setFormData({ title: '', description: '', value: '', label: '', icon: '', color: 'text-blue-600', order_index: 0 });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const colorOptions = [
    { value: 'text-blue-600', label: 'Blue' },
    { value: 'text-green-600', label: 'Green' },
    { value: 'text-purple-600', label: 'Purple' },
    { value: 'text-red-600', label: 'Red' },
    { value: 'text-yellow-600', label: 'Yellow' },
    { value: 'text-indigo-600', label: 'Indigo' },
    { value: 'text-pink-600', label: 'Pink' },
    { value: 'text-gray-600', label: 'Gray' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Cost Reduction"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon (Optional)
          </label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => handleChange('icon', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="💰"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Detailed description of this benefit..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value (Optional)
          </label>
          <input
            type="text"
            value={formData.value}
            onChange={(e) => handleChange('value', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="87%"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label (Optional)
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Cost Savings"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Theme
          </label>
          <select
            value={formData.color}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <input
            type="number"
            value={formData.order_index}
            onChange={(e) => handleChange('order_index', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            min="0"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : (benefit ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}