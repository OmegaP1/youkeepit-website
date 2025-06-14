// src/app/admin/components/problem/components/ProblemStatCard.js
"use client";

export default function ProblemStatCard({ stat, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this problem statistic?')) {
      onDelete(stat.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {stat.value}
          </div>
          <h4 className="font-semibold text-gray-800 mb-1">
            {stat.label}
          </h4>
          {stat.description && (
            <p className="text-sm text-gray-600">
              {stat.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(stat)}
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