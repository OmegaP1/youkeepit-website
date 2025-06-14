// src/app/admin/components/faq/components/FAQItem.js
"use client";

import { Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useState } from "react";

export default function FAQItem({ item, onEdit, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(item.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.question}</h4>
            <p className="text-gray-600 mb-2">{item.answer}</p>
            {item.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {item.category}
              </span>
            )}
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit(item)}
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
        title="Delete FAQ Item"
        message="Are you sure you want to delete this FAQ item? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}