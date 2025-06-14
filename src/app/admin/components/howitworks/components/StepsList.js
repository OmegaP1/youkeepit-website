// src/app/admin/components/howitworks/components/StepsList.js
"use client";

import StepCard from "./StepCard";

export default function StepsList({ steps, onEdit, onDelete }) {
  if (steps.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No steps found. Add your first step!</p>
      </div>
    );
  }

  // Sort steps by step_number
  const sortedSteps = [...steps].sort((a, b) => a.step_number - b.step_number);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Process Steps</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSteps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}