// src/app/admin/components/benefits/components/BenefitsList.js
"use client";

import BenefitCard from "./BenefitCard";

export default function BenefitsList({ benefits, onEdit, onDelete }) {
  if (benefits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No benefits found. Add your first benefit!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Benefits</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}