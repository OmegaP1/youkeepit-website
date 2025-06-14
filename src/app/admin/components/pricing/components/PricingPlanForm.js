// src/app/admin/components/pricing/components/PricingPlanForm.js
"use client";

import { useState } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";

export default function PricingPlanForm({ plan, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    price: plan?.price || "",
    period: plan?.period || "month",
    description: plan?.description || "",
    features: plan?.features || [],
    is_popular: plan?.is_popular || false,
    order_index: plan?.order_index || 0,
  });
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ 
        name: "", 
        price: "", 
        period: "month", 
        description: "", 
        features: [], 
        is_popular: false, 
        order_index: 0 
      });
    }
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        features: [...prev.features, newFeature.trim()] 
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({ 
      ...prev, 
      features: prev.features.filter((_, i) => i !== index) 
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {plan ? "Edit Pricing Plan" : "Add New Pricing Plan"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Plan Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Basic, Pro, Enterprise..."
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
            placeholder="29.99"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Period <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.period}
              onChange={(e) => handleChange("period", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>

        <FormTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Plan description..."
          rows={3}
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Features</label>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus size={16} />
            </button>
          </div>

          {formData.features.length > 0 && (
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_popular"
            checked={formData.is_popular}
            onChange={(e) => handleChange("is_popular", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="is_popular" className="text-sm font-medium text-gray-700">
            Mark as Popular Plan
          </label>
        </div>

        <FormInput
          label="Order Index"
          type="number"
          value={formData.order_index}
          onChange={(e) => handleChange("order_index", parseInt(e.target.value) || 0)}
          placeholder="0"
        />

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            {saving ? "Saving..." : (plan ? "Update" : "Create")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}