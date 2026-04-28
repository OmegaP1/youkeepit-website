// src/components/sections/FAQAccordion.js
'use client';

import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [openIds, setOpenIds] = useState(new Set());

  const toggle = id => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {items.map(item => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className="rounded-2xl border transition-all duration-300 hover:shadow-lg bg-gray-50/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className={`w-full px-6 py-6 text-left flex items-center justify-between transition-colors duration-200 ${
                isOpen
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span className="font-semibold text-lg pr-4">{item.question}</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6">
                <div className="w-full h-px mb-4 bg-gray-200 dark:bg-gray-600"></div>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
