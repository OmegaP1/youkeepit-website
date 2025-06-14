// src/app/admin/components/features/components/FeaturesList.js
"use client";

import FeatureCard from "./FeatureCard";

export default function FeaturesList({ features, onEdit, onDelete }) {
  if (features.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No features found. Add your first feature!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Current Features</h3>
      
      <div className="space-y-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
