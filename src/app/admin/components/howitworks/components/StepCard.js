// src/app/admin/components/howitworks/components/StepCard.js
"use client";

export default function StepCard({ step, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this step?')) {
      onDelete(step.id);
    }
  };

  const getStepColor = (stepNumber) => {
    const colors = [
      'bg-blue-600',
      'bg-green-600', 
      'bg-purple-600',
      'bg-red-600',
      'bg-yellow-600',
      'bg-indigo-600'
    ];
    return colors[(stepNumber - 1) % colors.length] || 'bg-gray-600';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${getStepColor(step.step_number)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
            {step.step_number}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">
              {step.title}
            </h4>
          </div>
        </div>
      </div>
      
      {step.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {step.description}
        </p>
      )}
      
      {step.color && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">Color:</span>
          <div 
            className="w-4 h-4 rounded border border-gray-300" 
            style={{ backgroundColor: step.color }}
          ></div>
          <span className="text-xs text-gray-600">{step.color}</span>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(step)}
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