// src/app/admin/components/pricing/components/PricingPlanCard.js
"use client";

import { Edit, Trash2, Star } from 'lucide-react';
import FeaturesList from './FeaturesList';

export default function PricingPlanCard({ plan, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      onDelete(plan.id);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${
        plan.is_popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-semibold text-gray-800">{plan.name}</h4>
            {plan.is_popular && (
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
          {plan.is_popular && (
            <span className="inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              Popular
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">${plan.price}</div>
          {plan.period && (
            <div className="text-sm text-gray-600">/{plan.period}</div>
          )}
        </div>
      </div>

      {plan.description && (
        <p className="text-gray-600 mb-3">{plan.description}</p>
      )}

      <div className="mb-4">
        <FeaturesList features={plan.features} />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(plan)}
          className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
        >
          <Edit size={14} />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-1 flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}