// src/app/admin/components/stats/components/StatsList.js
"use client";

import StatCard from "./StatCard";

export default function StatsList({ stats, onEdit, onDelete }) {
  if (stats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No company stats found. Add your first stat!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}