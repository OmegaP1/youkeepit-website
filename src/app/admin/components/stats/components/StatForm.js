// src/app/admin/components/stats/components/StatForm.js
"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";

export default function StatForm({ stat, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    value: stat?.value || "",
    label: stat?.label || "",
    description: stat?.description || "",
    order_index: stat?.order_index || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ value: "", label: "", description: "", order_index: 0 });
    }
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {stat ? "Edit Company Stat" : "Add New Company Stat"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Value"
          value={formData.value}
          onChange={(e) => handleChange("value", e.target.value)}
          placeholder="100%, $5M, 50K+..."
          required
        />

        <FormInput
          label="Label"
          value={formData.label}
          onChange={(e) => handleChange("label", e.target.value)}
          placeholder="Success Rate, Revenue, Customers..."
          required
        />

        <FormTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief description of this statistic..."
          rows={3}
        />

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
            {saving ? "Saving..." : (stat ? "Update" : "Create")}
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