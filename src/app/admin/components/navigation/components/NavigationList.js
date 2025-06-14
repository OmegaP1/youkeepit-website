// src/app/admin/components/navigation/components/NavigationList.js
"use client";

import NavigationItem from "./NavigationItem";

export default function NavigationList({ items, onUpdateItem, onRemoveItem }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="mb-3">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No navigation items yet
          </h3>
          <p className="text-gray-500">
            Add your first navigation item to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Navigation Items
          </h3>
          <div className="text-sm text-gray-500">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-4">
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
    </div>
  );
}