// src/app/admin/components/pricing/components/PricingPlanCard.js
"use client";

import { Edit2, Trash2, Check } from "lucide-react";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useState } from "react";

export default function PricingPlanCard({ plan, onEdit, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(plan.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
        plan.is_popular ? "border-blue-500 relative" : "border-gray-200"
      }`}>
        {plan.is_popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="text-3xl font-bold text-blue-600 mb-1">
            ${plan.price}
            <span className="text-base font-normal text-gray-600">/{plan.period}</span>
          </div>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        {plan.features && plan.features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(plan)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
          >
            <Edit2 size={14} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
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
        title="Delete Pricing Plan"
        message="Are you sure you want to delete this pricing plan? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}