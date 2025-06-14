// src/app/admin/components/pricing/PricingManager.js
"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import PricingPlansList from "./components/PricingPlansList";
import PricingPlanForm from "./components/PricingPlanForm";
import { usePricing } from "./hooks/usePricing";

export default function PricingManager({ showMessage }) {
  const { plans, loading, fetchPlans, createPlan, updatePlan, deletePlan } = usePricing();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreate = async (planData) => {
    const success = await createPlan(planData);
    if (success) {
      showMessage("success", "Pricing plan created successfully!");
      setShowAddForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create pricing plan");
      return false;
    }
  };

  const handleUpdate = async (id, planData) => {
    const success = await updatePlan(id, planData);
    if (success) {
      showMessage("success", "Pricing plan updated successfully!");
      setEditingPlan(null);
      return true;
    } else {
      showMessage("error", "Failed to update pricing plan");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const success = await deletePlan(id);
    if (success) {
      showMessage("success", "Pricing plan deleted successfully!");
    } else {
      showMessage("error", "Failed to delete pricing plan");
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading pricing plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Pricing Plans Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Plan
        </button>
      </div>

      {showAddForm && (
        <PricingPlanForm
          plan={editingPlan}
          onSubmit={editingPlan ? 
            (data) => handleUpdate(editingPlan.id, data) : 
            handleCreate
          }
          onCancel={handleCancelEdit}
        />
      )}

      <PricingPlansList
        plans={plans}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}