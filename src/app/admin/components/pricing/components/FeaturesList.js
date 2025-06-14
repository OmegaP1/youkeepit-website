// src/app/admin/components/pricing/components/FeaturesList.js
"use client";

export default function FeaturesList({ features }) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-1">
      {features.map((feature, index) => (
        <li key={index} className="text-sm text-gray-600 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
          {feature}
        </li>
      ))}
    </ul>
  );
}