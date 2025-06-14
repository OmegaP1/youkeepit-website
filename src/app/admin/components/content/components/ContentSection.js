// src/app/admin/components/content/components/ContentSection.js
"use client";

import ContentItem from "./ContentItem";

export default function ContentSection({ section, items, onUpdate, showMessage }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">
          {section.replace("_", " ")} Section
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {items.map((item) => (
          <ContentItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            showMessage={showMessage}
          />
        ))}
      </div>
    </div>
  );
}