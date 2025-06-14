// src/app/admin/components/stats/StatsManager.js
"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import StatsList from "./components/StatsList";
import StatForm from "./components/StatForm";
import { useStats } from "./hooks/useStats";

export default function StatsManager({ showMessage }) {
  const { stats, loading, fetchStats, createStat, updateStat, deleteStat } = useStats();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStat, setEditingStat] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCreate = async (statData) => {
    const success = await createStat(statData);
    if (success) {
      showMessage("success", "Company stat created successfully!");
      setShowAddForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create company stat");
      return false;
    }
  };

  const handleUpdate = async (id, statData) => {
    const success = await updateStat(id, statData);
    if (success) {
      showMessage("success", "Company stat updated successfully!");
      setEditingStat(null);
      return true;
    } else {
      showMessage("error", "Failed to update company stat");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteStat(id);
    if (success) {
      showMessage("success", "Company stat deleted successfully!");
    } else {
      showMessage("error", "Failed to delete company stat");
    }
  };

  const handleEdit = (stat) => {
    setEditingStat(stat);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingStat(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading company stats...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Company Stats</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Stat
        </button>
      </div>

      {showAddForm && (
        <StatForm
          stat={editingStat}
          onSubmit={editingStat ? 
            (data) => handleUpdate(editingStat.id, data) : 
            handleCreate
          }
          onCancel={handleCancelEdit}
        />
      )}

      <StatsList
        stats={stats}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}