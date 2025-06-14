// src/app/admin/components/features/FeaturesManager.js
"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import FeaturesList from "./components/FeaturesList";
import FeatureForm from "./components/FeatureForm";
import { useFeatures } from "./hooks/useFeatures";

export default function FeaturesManager({ showMessage }) {
  const { features, loading, fetchFeatures, createFeature, updateFeature, deleteFeature } = useFeatures();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleCreate = async (featureData) => {
    const success = await createFeature(featureData);
    if (success) {
      showMessage("success", "Feature created successfully!");
      setShowAddForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create feature");
      return false;
    }
  };

  const handleUpdate = async (id, featureData) => {
    const success = await updateFeature(id, featureData);
    if (success) {
      showMessage("success", "Feature updated successfully!");
      setEditingFeature(null);
      return true;
    } else {
      showMessage("error", "Failed to update feature");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteFeature(id);
    if (success) {
      showMessage("success", "Feature deleted successfully!");
    } else {
      showMessage("error", "Failed to delete feature");
    }
  };

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingFeature(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading features...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Features Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Feature
        </button>
      </div>

      {showAddForm && (
        <FeatureForm
          feature={editingFeature}
          onSubmit={editingFeature ? 
            (data) => handleUpdate(editingFeature.id, data) : 
            handleCreate
          }
          onCancel={handleCancelEdit}
        />
      )}

      <FeaturesList
        features={features}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
