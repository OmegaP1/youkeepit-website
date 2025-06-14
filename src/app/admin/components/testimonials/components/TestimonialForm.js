// src/app/admin/components/testimonials/components/TestimonialForm.js
"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";
import StarRating from "./StarRating";

export default function TestimonialForm({ testimonial, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    company: testimonial?.company || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
    order_index: testimonial?.order_index || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ name: "", role: "", company: "", content: "", rating: 5, order_index: 0 });
    }
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Customer Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="John Doe"
          required
        />

        <FormInput
          label="Role/Position"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          placeholder="CEO, Marketing Director, etc."
          required
        />

        <FormInput
          label="Company (Optional)"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="Company Name"
        />

        <FormTextarea
          label="Testimonial Content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="What they said about your service..."
          rows={4}
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRating
            rating={formData.rating}
            onRatingChange={(rating) => handleChange("rating", rating)}
          />
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
            {saving ? "Saving..." : (testimonial ? "Update" : "Create")}
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