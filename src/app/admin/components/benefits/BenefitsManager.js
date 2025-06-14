// src/app/admin/components/benefits/BenefitsManager.js
"use client";

import { useState, useEffect } from "react";
import { Award, Plus } from "lucide-react";
import BenefitsForm from "./components/BenefitsForm";
import BenefitsList from "./components/BenefitsList";
import BenefitForm from "./components/BenefitForm";
import { useBenefits } from "./hooks/useBenefits";

export default function BenefitsManager({ showMessage }) {
  const { 
    benefitsContent, 
    benefits, 
    loading, 
    fetchBenefitsData, 
    updateBenefitsContent, 
    createBenefit, 
    updateBenefit, 
    deleteBenefit 
  } = useBenefits();
  
  const [showAddBenefitForm, setShowAddBenefitForm] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(null);

  useEffect(() => {
    fetchBenefitsData();
  }, []);

  const handleUpdateContent = async (contentData) => {
    const success = await updateBenefitsContent(contentData);
    if (success) {
      showMessage("success", "Benefits content updated successfully!");
      return true;
    } else {
      showMessage("error", "Failed to update benefits content");
      return false;
    }
  };

  const handleCreateBenefit = async (benefitData) => {
    const success = await createBenefit(benefitData);
    if (success) {
      showMessage("success", "Benefit created successfully!");
      setShowAddBenefitForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create benefit");
      return false;
    }
  };

  const handleUpdateBenefit = async (id, benefitData) => {
    const success = await updateBenefit(id, benefitData);
    if (success) {
      showMessage("success", "Benefit updated successfully!");
      setEditingBenefit(null);
      return true;
    } else {
      showMessage("error", "Failed to update benefit");
      return false;
    }
  };

  const handleDeleteBenefit = async (id) => {
    const success = await deleteBenefit(id);
    if (success) {
      showMessage("success", "Benefit deleted successfully!");
    } else {
      showMessage("error", "Failed to delete benefit");
    }
  };

  const handleEditBenefit = (benefit) => {
    setEditingBenefit(benefit);
    setShowAddBenefitForm(true);
  };

  const handleCancelEdit = () => {
    setEditingBenefit(null);
    setShowAddBenefitForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading benefits content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">Benefits Management</h2>
        </div>
        <button
          onClick={() => setShowAddBenefitForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={16} />
          Add Benefit
        </button>
      </div>

      {/* Benefits Content Form */}
      <BenefitsForm
        content={benefitsContent}
        onSubmit={handleUpdateContent}
      />

      {/* Add/Edit Benefit Form */}
      {showAddBenefitForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingBenefit ? 'Edit Benefit' : 'Add New Benefit'}
          </h3>
          
          <BenefitForm
            benefit={editingBenefit}
            onSubmit={editingBenefit ? 
              (data) => handleUpdateBenefit(editingBenefit.id, data) : 
              handleCreateBenefit
            }
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Benefits List */}
      <BenefitsList
        benefits={benefits}
        onEdit={handleEditBenefit}
        onDelete={handleDeleteBenefit}
      />
    </div>
  );
}