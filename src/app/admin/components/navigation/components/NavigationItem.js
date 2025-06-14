// src/app/admin/components/navigation/components/NavigationItem.js
"use client";

import { Trash2, GripVertical } from 'lucide-react';

export default function NavigationItem({ item, index, onUpdate, onRemove }) {
  return (
    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-gray-50/50">
      {/* Drag handle */}
      <div className="text-gray-400 cursor-move">
        <GripVertical size={18} />
      </div>

      {/* Order number */}
      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-medium">
        {index + 1}
      </div>

      {/* Label input */}
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Label
        </label>
        <input
          type="text"
          placeholder="Home, About, Contact..."
          value={item.label || ''}
          onChange={e => onUpdate(index, 'label', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* URL input */}
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="text"
          placeholder="#home, /about, https://..."
          value={item.href || ''}
          onChange={e => onUpdate(index, 'href', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(index)}
        className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
        title="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}