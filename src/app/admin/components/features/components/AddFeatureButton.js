
// src/app/admin/components/features/components/AddFeatureButton.js
"use client";

import { Plus } from "lucide-react";

export default function AddFeatureButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Plus size={16} />
      Add Feature
    </button>
  );
}