// src/app/admin/components/features/components/FeatureForm.js
"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";

export default function FeatureForm({ feature, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: feature?.title || "",
    description: feature?.description || "",
    icon: feature?.icon || "",
    order_index: feature?.order_index || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ title: "", description: "", icon: "", order_index: 0 });
    }
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {feature ? "Edit Feature" : "Add New Feature"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Feature title"
          required
        />

        <FormTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Feature description"
          rows={3}
          required
        />

        <FormInput
          label="Icon (Emoji)"
          value={formData.icon}
          onChange={(e) => handleChange("icon", e.target.value)}
          placeholder="🚀"
          required
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
            {saving ? "Saving..." : (feature ? "Update" : "Create")}
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