// src/app/admin/components/problem/components/ProblemStatForm.js
"use client";

import { useState, useEffect } from "react";

export default function ProblemStatForm({ stat, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    value: '',
    label: '',
    description: '',
    color: 'text-red-500',
    order_index: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (stat) {
      setFormData({
        value: stat.value || '',
        label: stat.label || '',
        description: stat.description || '',
        color: stat.color || 'text-red-500',
        order_index: stat.order_index || 0
      });
    }
  }, [stat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    setSaving(false);
    
    if (success) {
      setFormData({ value: '', label: '', description: '', color: 'text-red-500', order_index: 0 });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const colorOptions = [
    { value: 'text-red-500', label: 'Red' },
    { value: 'text-red-600', label: 'Dark Red' },
    { value: 'text-orange-500', label: 'Orange' },
    { value: 'text-yellow-500', label: 'Yellow' },
    { value: 'text-gray-600', label: 'Gray' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            type="text"
            value={formData.value}
            onChange={(e) => handleChange('value', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
            placeholder="$3,200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
            placeholder="Lost Per Device"
            required
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
          placeholder="Detailed description of this problem statistic..."
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : (stat ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}