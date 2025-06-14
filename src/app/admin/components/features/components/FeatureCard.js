// src/app/admin/components/features/components/FeatureCard.js
"use client";

import { Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useState } from "react";

export default function FeatureCard({ feature, onEdit, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(feature.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{feature.icon}</span>
              <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit(feature)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
            >
              <Edit2 size={14} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Feature"
        message="Are you sure you want to delete this feature? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}