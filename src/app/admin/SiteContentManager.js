// src/components/admin/SiteContentManager.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { useAdminActions } from '@/hooks/useAdminActions'

const SiteContentManager = () => {
  const { siteContent } = useContent()
  const { updateSiteContent, saving } = useAdminActions()
  const [editingContent, setEditingContent] = useState({})

  const handleContentUpdate = async (sectionName, contentKey, value, type = 'text') => {
    const success = await updateSiteContent(sectionName, contentKey, value, type)
    if (success) {
      setEditingContent({})
    }
  }

  const handleEdit = (sectionName, contentKey) => {
    setEditingContent({ [sectionName]: { [contentKey]: true } })
  }

  const isEditing = (sectionName, contentKey) => {
    return editingContent[sectionName]?.[contentKey] || false
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Site Content Management</h2>
        <p className="text-gray-600 mt-1">Manage text content, headings, and descriptions across the website</p>
      </div>

      <div className="space-y-6">
        {Object.entries(siteContent).map(([sectionName, sectionData]) => (
          <div key={sectionName} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
              {sectionName.replace(/_/g, ' ')} Section
            </h3>
            
            <div className="space-y-4">
              {Object.entries(sectionData).map(([contentKey, contentData]) => (
                <div key={contentKey} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {contentKey.replace(/_/g, ' ')}
                    </label>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {contentData.type}
                    </span>
                  </div>
                  
                  {isEditing(sectionName, contentKey) ? (
                    <div className="space-y-2">
                      {contentData.type === 'text' ? (
                        <textarea
                          defaultValue={contentData.value}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          rows={3}
                          onBlur={(e) => handleContentUpdate(sectionName, contentKey, e.target.value, contentData.type)}
                        />
                      ) : (
                        <input
                          type="text"
                          defaultValue={contentData.value}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          onBlur={(e) => handleContentUpdate(sectionName, contentKey, e.target.value, contentData.type)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className="p-3 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleEdit(sectionName, contentKey)}
                    >
                      <p className="text-gray-800">{contentData.value || 'Click to edit'}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to edit</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {Object.keys(siteContent).length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No site content found. Content will appear here as you add it to the database.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SiteContentManager