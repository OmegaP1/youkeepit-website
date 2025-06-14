// src/app/admin/components/content/components/ContentItem.js
"use client";

import { useState } from "react";
import { Edit2, Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";

export default function ContentItem({ item, onUpdate, showMessage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(item);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(item);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(item);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_content")
        .update({
          content_value: formData.content_value,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Content updated successfully!");
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update content");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">
            {item.content_key.replace("_", " ").toUpperCase()}
          </p>

          {isEditing ? (
            <div className="space-y-3">
              {item.content_type === "textarea" ? (
                <FormTextarea
                  value={formData.content_value}
                  onChange={(e) =>
                    setFormData({ ...formData, content_value: e.target.value })
                  }
                  rows={6}
                />
              ) : (
                <FormInput
                  value={formData.content_value}
                  onChange={(e) =>
                    setFormData({ ...formData, content_value: e.target.value })
                  }
                />
              )}

              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={14} />
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`${
                  item.content_type === "textarea"
                    ? "text-gray-700 whitespace-pre-wrap"
                    : "text-lg font-medium text-gray-900"
                } mb-2`}
              >
                {item.content_value}
              </div>

              <button
                onClick={handleEdit}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
              >
                <Edit2 size={14} />
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}