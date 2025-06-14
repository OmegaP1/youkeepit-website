// src/app/admin/components/problem/ProblemManager.js
"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Plus } from "lucide-react";
import ProblemForm from "./components/ProblemForm";
import ProblemStatsList from "./components/ProblemStatsList";
import ProblemStatForm from "./components/ProblemStatForm";
import { useProblem } from "./hooks/useProblem";

export default function ProblemManager({ showMessage }) {
  const { 
    problemContent, 
    problemStats, 
    loading, 
    fetchProblemData, 
    updateProblemContent, 
    createProblemStat, 
    updateProblemStat, 
    deleteProblemStat 
  } = useProblem();
  
  const [showAddStatForm, setShowAddStatForm] = useState(false);
  const [editingStat, setEditingStat] = useState(null);

  useEffect(() => {
    fetchProblemData();
  }, []);

  const handleUpdateContent = async (contentData) => {
    const success = await updateProblemContent(contentData);
    if (success) {
      showMessage("success", "Problem content updated successfully!");
      return true;
    } else {
      showMessage("error", "Failed to update problem content");
      return false;
    }
  };

  const handleCreateStat = async (statData) => {
    const success = await createProblemStat(statData);
    if (success) {
      showMessage("success", "Problem statistic created successfully!");
      setShowAddStatForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create problem statistic");
      return false;
    }
  };

  const handleUpdateStat = async (id, statData) => {
    const success = await updateProblemStat(id, statData);
    if (success) {
      showMessage("success", "Problem statistic updated successfully!");
      setEditingStat(null);
      return true;
    } else {
      showMessage("error", "Failed to update problem statistic");
      return false;
    }
  };

  const handleDeleteStat = async (id) => {
    const success = await deleteProblemStat(id);
    if (success) {
      showMessage("success", "Problem statistic deleted successfully!");
    } else {
      showMessage("error", "Failed to delete problem statistic");
    }
  };

  const handleEditStat = (stat) => {
    setEditingStat(stat);
    setShowAddStatForm(true);
  };

  const handleCancelEdit = () => {
    setEditingStat(null);
    setShowAddStatForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading problem content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <h2 className="text-3xl font-bold text-gray-900">Problem Section Management</h2>
        </div>
        <button
          onClick={() => setShowAddStatForm(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={16} />
          Add Problem Stat
        </button>
      </div>

      {/* Problem Content Form */}
      <ProblemForm
        content={problemContent}
        onSubmit={handleUpdateContent}
      />

      {/* Add/Edit Stat Form */}
      {showAddStatForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingStat ? 'Edit Problem Statistic' : 'Add New Problem Statistic'}
          </h3>
          
          <ProblemStatForm
            stat={editingStat}
            onSubmit={editingStat ? 
              (data) => handleUpdateStat(editingStat.id, data) : 
              handleCreateStat
            }
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Problem Statistics List */}
      <ProblemStatsList
        stats={problemStats}
        onEdit={handleEditStat}
        onDelete={handleDeleteStat}
      />
    </div>
  );
}