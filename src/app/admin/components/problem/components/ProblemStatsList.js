// src/app/admin/components/problem/components/ProblemStatsList.js
"use client";

import ProblemStatCard from "./ProblemStatCard";

export default function ProblemStatsList({ stats, onEdit, onDelete }) {
  if (stats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No problem statistics found. Add your first statistic!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Problem Statistics</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <ProblemStatCard
            key={stat.id}
            stat={stat}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}