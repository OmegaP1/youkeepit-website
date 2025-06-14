// src/app/admin/components/stats/components/StatCard.js
"use client";

import { Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useState } from "react";

export default function StatCard({ stat, onEdit, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(stat.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {stat.value}
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {stat.label}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {stat.description}
          </p>
        </div>
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => onEdit(stat)}
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

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Company Stat"
        message="Are you sure you want to delete this company stat? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}