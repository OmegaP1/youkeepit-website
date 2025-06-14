// src/app/admin/components/navigation/components/NavigationItem.js
"use client";

import { Trash2 } from "lucide-react";
import FormInput from "../../ui/FormInput";

export default function NavigationItem({ item, index, onUpdate, onRemove }) {
  return (
    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
      <div className="flex-1">
        <FormInput
          placeholder="Label (e.g., Home, About)"
          value={item.label}
          onChange={(e) => onUpdate(index, "label", e.target.value)}
        />
      </div>
      <div className="flex-1">
        <FormInput
          placeholder="URL (e.g., /, /about)"
          value={item.href}
          onChange={(e) => onUpdate(index, "href", e.target.value)}
        />
      </div>
      <button
        onClick={() => onRemove(index)}
        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}