// src/app/admin/components/faq/components/FAQList.js
"use client";

import FAQItem from "./FAQItem";

export default function FAQList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No FAQ items found. Add your first FAQ item!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">FAQ Items</h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}