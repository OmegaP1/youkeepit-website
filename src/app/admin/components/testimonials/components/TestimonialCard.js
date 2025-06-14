// src/app/admin/components/testimonials/components/TestimonialCard.js
"use client";

import { Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "../../ui/ConfirmDialog";
import StarRating from "./StarRating";
import { useState } from "react";

export default function TestimonialCard({ testimonial, onEdit, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(testimonial.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <StarRating rating={testimonial.rating} readOnly />
            </div>
            <p className="text-gray-700 italic mb-2">"{testimonial.content}"</p>
            {testimonial.company && (
              <p className="text-sm text-gray-500">at {testimonial.company}</p>
            )}
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit(testimonial)}
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
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}