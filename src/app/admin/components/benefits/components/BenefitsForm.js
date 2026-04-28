// src/app/admin/components/benefits/components/BenefitsForm.js
"use client";

import { useState, useEffect } from "react";

export default function BenefitsForm({ content, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtitle: '',
    cta_text: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        description: content.description || '',
        subtitle: content.subtitle || '',
        cta_text: content.cta_text || ''
      });
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Benefits Section Content</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Why Choose KeepMyKit?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={e => handleChange('subtitle', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Discover the advantages that make us..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Detailed description of the benefits..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Call to Action Text
          </label>
          <input
            type="text"
            value={formData.cta_text}
            onChange={e => handleChange('cta_text', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Explore Features"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Update Benefits Content'}
          </button>
        </div>
      </form>
    </div>
  );
}