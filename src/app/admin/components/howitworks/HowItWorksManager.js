// src/app/admin/components/howitworks/HowItWorksManager.js
"use client";

import { useState, useEffect } from "react";
import { Settings, Plus } from "lucide-react";
import HowItWorksForm from "./components/HowItWorksForm";
import StepsList from "./components/StepsList";
import StepForm from "./components/StepForm";
import { useHowItWorks } from "./hooks/useHowItWorks";

export default function HowItWorksManager({ showMessage }) {
  const { 
    howItWorksContent, 
    steps, 
    loading, 
    fetchHowItWorksData, 
    updateHowItWorksContent, 
    createStep, 
    updateStep, 
    deleteStep 
  } = useHowItWorks();
  
  const [showAddStepForm, setShowAddStepForm] = useState(false);
  const [editingStep, setEditingStep] = useState(null);

  useEffect(() => {
    fetchHowItWorksData();
  }, []);

  const handleUpdateContent = async (contentData) => {
    const success = await updateHowItWorksContent(contentData);
    if (success) {
      showMessage("success", "How It Works content updated successfully!");
      return true;
    } else {
      showMessage("error", "Failed to update How It Works content");
      return false;
    }
  };

  const handleCreateStep = async (stepData) => {
    const success = await createStep(stepData);
    if (success) {
      showMessage("success", "Step created successfully!");
      setShowAddStepForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create step");
      return false;
    }
  };

  const handleUpdateStep = async (id, stepData) => {
    const success = await updateStep(id, stepData);
    if (success) {
      showMessage("success", "Step updated successfully!");
      setEditingStep(null);
      return true;
    } else {
      showMessage("error", "Failed to update step");
      return false;
    }
  };

  const handleDeleteStep = async (id) => {
    const success = await deleteStep(id);
    if (success) {
      showMessage("success", "Step deleted successfully!");
    } else {
      showMessage("error", "Failed to delete step");
    }
  };

  const handleEditStep = (step) => {
    setEditingStep(step);
    setShowAddStepForm(true);
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    setShowAddStepForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading How It Works content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">How It Works Management</h2>
        </div>
        <button
          onClick={() => setShowAddStepForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Step
        </button>
      </div>

      {/* How It Works Content Form */}
      <HowItWorksForm
        content={howItWorksContent}
        onSubmit={handleUpdateContent}
      />

      {/* Add/Edit Step Form */}
      {showAddStepForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingStep ? 'Edit Step' : 'Add New Step'}
          </h3>
          
          <StepForm
            step={editingStep}
            onSubmit={editingStep ? 
              (data) => handleUpdateStep(editingStep.id, data) : 
              handleCreateStep
            }
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Steps List */}
      <StepsList
        steps={steps}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
      />
    </div>
  );
}