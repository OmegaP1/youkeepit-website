// src/app/admin/components/navigation/components/NavigationList.js
"use client";

import NavigationItem from "./NavigationItem";

export default function NavigationList({ items, onUpdateItem, onRemoveItem }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No navigation items. Add your first item!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Navigation Items</h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <NavigationItem
            key={index}
            item={item}
            index={index}
            onUpdate={onUpdateItem}
            onRemove={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
}