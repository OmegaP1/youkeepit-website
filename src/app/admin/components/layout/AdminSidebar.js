// src/app/admin/components/layout/AdminSidebar.js
"use client";

import {
  FileText,
  Star,
  Users,
  DollarSign,
  HelpCircle,
  Navigation,
  BarChart3,
  AlertTriangle,
  Settings,
  Award,
} from 'lucide-react';

const tabs = [
  { id: 'content', label: 'Site Content', icon: FileText },
  { id: 'features', label: 'Features', icon: Star },
  { id: 'testimonials', label: 'Testimonials', icon: Users },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'navigation', label: 'Navigation', icon: Navigation },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'problem', label: 'Problem Section', icon: AlertTriangle },
  { id: 'howitworks', label: 'How It Works', icon: Settings },
  { id: 'benefits', label: 'Benefits', icon: Award },
];

export default function AdminSidebar({ activeTab, onTabChange }) {
  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    activeTab === tab.id ? "text-blue-700" : "text-gray-400"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}