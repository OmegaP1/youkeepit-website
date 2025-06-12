// src/components/admin/AdminDashboard.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import FeaturesManager from './FeaturesManager'
import TestimonialsManager from './TestimonialsManager'
import PricingManager from './PricingManager'
import FAQManager from './FAQManager'
import SiteContentManager from './SiteContentManager'
import NavigationManager from './NavigationManager'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('features')
  const { loading, error } = useContent()

  const tabs = [
    { id: 'features', label: 'Features', icon: '⚙️' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'navigation', label: 'Navigation', icon: '🧭' },
    { id: 'content', label: 'Site Content', icon: '📝' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error loading admin panel</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">YouKeepIt Admin</h1>
          <p className="text-sm text-gray-600 mt-1">Content Management</p>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3 text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'features' && <FeaturesManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'pricing' && <PricingManager />}
          {activeTab === 'faq' && <FAQManager />}
          {activeTab === 'navigation' && <NavigationManager />}
          {activeTab === 'content' && <SiteContentManager />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard