// src/components/admin/NavigationManager.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { useAdminActions } from '@/hooks/useAdminActions'

const NavigationManager = () => {
  const { navigationItems } = useContent()
  const { updateNavigationItems, saving } = useAdminActions()
  const [localNavItems, setLocalNavItems] = useState([])

  React.useEffect(() => {
    setLocalNavItems(navigationItems)
  }, [navigationItems])

  const handleSave = async () => {
    await updateNavigationItems(localNavItems)
  }

  const addNavItem = () => {
    setLocalNavItems([...localNavItems, { label: '', href: '' }])
  }

  const updateNavItem = (index, field, value) => {
    const updated = [...localNavItems]
    updated[index] = { ...updated[index], [field]: value }
    setLocalNavItems(updated)
  }

  const removeNavItem = (index) => {
    setLocalNavItems(localNavItems.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Navigation Management</h2>
        <div className="space-x-2">
          <button
            onClick={addNavItem}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Item
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Navigation Items</h3>
        
        {localNavItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No navigation items. Add your first item!</p>
        ) : (
          <div className="space-y-4">
            {localNavItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="text-gray-500 font-medium">#{index + 1}</div>
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Label"
                    value={item.label || ''}
                    onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Link (e.g., #section or /page)"
                    value={item.href || ''}
                    onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => removeNavItem(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavigationManager