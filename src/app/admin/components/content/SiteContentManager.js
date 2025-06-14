// src/app/admin/components/content/SiteContentManager.js
"use client";

import { useState, useEffect } from "react";
import ContentSection from "./components/ContentSection";
import { useSiteContent } from "./hooks/useSiteContent";

export default function SiteContentManager({ showMessage }) {
  const { content, loading, fetchContent } = useSiteContent();

  useEffect(() => {
    fetchContent();
  }, []);

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section_name]) {
      acc[item.section_name] = [];
    }
    acc[item.section_name].push(item);
    return acc;
  }, {});

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Site Content</h2>
        <p className="text-gray-600">Manage your website content</p>
      </div>

      {Object.entries(groupedContent).map(([section, items]) => (
        <ContentSection
          key={section}
          section={section}
          items={items}
          onUpdate={fetchContent}
          showMessage={showMessage}
        />
      ))}
    </div>
  );
}