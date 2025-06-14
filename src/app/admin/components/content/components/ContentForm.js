// src/app/admin/components/content/components/ContentForm.js
"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";

export default function ContentForm({ content, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    section_name: content?.section_name || "",
    content_key: content?.content_key || "",
    content_value: content?.content_value || "",
    content_type: content?.content_type || "text",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ section_name: "", content_key: "", content_value: "", content_type: "text" });
    }
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {content ? "Edit Content" : "Add New Content"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Section Name"
          value={formData.section_name}
          onChange={(e) => handleChange("section_name", e.target.value)}
          placeholder="hero, about, features..."
          required
        />

        <FormInput
          label="Content Key"
          value={formData.content_key}
          onChange={(e) => handleChange("content_key", e.target.value)}
          placeholder="headline, description, title..."
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.content_type}
            onChange={(e) => handleChange("content_type", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="html">HTML</option>
          </select>
        </div>

        {formData.content_type === "textarea" || formData.content_type === "html" ? (
          <FormTextarea
            label="Content Value"
            value={formData.content_value}
            onChange={(e) => handleChange("content_value", e.target.value)}
            placeholder="Enter your content..."
            rows={6}
            required
          />
        ) : (
          <FormInput
            label="Content Value"
            value={formData.content_value}
            onChange={(e) => handleChange("content_value", e.target.value)}
            placeholder="Enter your content..."
            required
          />
        )}

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            {saving ? "Saving..." : (content ? "Update" : "Create")}
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