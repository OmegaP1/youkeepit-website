// src/app/admin/components/pricing/components/PricingPlansList.js
'use client';

import PricingPlanCard from './PricingPlanCard';

export default function PricingPlansList({ plans, onEdit, onDelete }) {
  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">
          No pricing plans found. Add your first plan!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Current Pricing Plans</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
