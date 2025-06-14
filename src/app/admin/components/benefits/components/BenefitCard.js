// src/app/admin/components/benefits/components/BenefitCard.js
"use client";

export default function BenefitCard({ benefit, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this benefit?')) {
      onDelete(benefit.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {benefit.icon && (
              <span className="text-lg">{benefit.icon}</span>
            )}
            <h4 className="font-semibold text-gray-800">
              {benefit.title}
            </h4>
          </div>
          
          {benefit.value && benefit.label && (
            <div className="mb-2">
              <span className={`text-2xl font-bold ${benefit.color}`}>
                {benefit.value}
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {benefit.label}
              </span>
            </div>
          )}
          
          {benefit.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {benefit.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(benefit)}
          className="flex-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}