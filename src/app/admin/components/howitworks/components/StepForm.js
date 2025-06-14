// src/app/admin/components/howitworks/components/StepForm.js
"use client";

import { useState, useEffect } from "react";

export default function StepForm({ step, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    step_number: 1,
    title: '',
    description: '',
    color: 'bg-blue-600',
    icon: '',
    order_index: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (step) {
      setFormData({
        step_number: step.step_number || 1,
        title: step.title || '',
        description: step.description || '',
        color: step.color || 'bg-blue-600',
        icon: step.icon || '',
        order_index: step.order_index || 0
      });
    }
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    setSaving(false);
    
    if (success) {
      setFormData({ step_number: 1, title: '', description: '', color: 'bg-blue-600', icon: '', order_index: 0 });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const colorOptions = [
    { value: 'bg-blue-600', label: 'Blue' },
    { value: 'bg-green-600', label: 'Green' },
    { value: 'bg-purple-600', label: 'Purple' },
    { value: 'bg-red-600', label: 'Red' },
    { value: 'bg-yellow-600', label: 'Yellow' },
    { value: 'bg-indigo-600', label: 'Indigo' },
    { value: 'bg-pink-600', label: 'Pink' },
    { value: 'bg-gray-600', label: 'Gray' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Step Number
          </label>
          <input
            type="number"
            value={formData.step_number}
            onChange={(e) => handleChange('step_number', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            min="1"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Upload Inventory"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="📊"
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Detailed description of this step..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Theme
          </label>
          <select
            value={formData.color}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : (step ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}