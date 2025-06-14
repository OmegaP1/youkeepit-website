// src/app/admin/components/faq/components/FAQForm.js
"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";

export default function FAQForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    question: item?.question || "",
    answer: item?.answer || "",
    category: item?.category || "",
    order_index: item?.order_index || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ question: "", answer: "", category: "", order_index: 0 });
    }
    
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {item ? "Edit FAQ Item" : "Add New FAQ Item"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Question"
          value={formData.question}
          onChange={(e) => handleChange("question", e.target.value)}
          placeholder="What is your question?"
          required
        />

        <FormTextarea
          label="Answer"
          value={formData.answer}
          onChange={(e) => handleChange("answer", e.target.value)}
          placeholder="Provide a detailed answer..."
          rows={4}
          required
        />

        <FormInput
          label="Category (Optional)"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="General, Pricing, Support..."
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
            {saving ? "Saving..." : (item ? "Update" : "Create")}
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