// src/components/admin/FeaturesManager.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { useAdminActions } from '@/hooks/useAdminActions'

const FeaturesManager = () => {
  const { features } = useContent()
  const { createFeature, updateFeature, deleteFeature, saving } = useAdminActions()
  const [editingFeature, setEditingFeature] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    order_index: 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let success
    if (editingFeature) {
      success = await updateFeature(editingFeature.id, formData)
    } else {
      success = await createFeature(formData)
    }

    if (success) {
      setFormData({ title: '', description: '', icon: '', order_index: 0 })
      setEditingFeature(null)
      setShowAddForm(false)
    }
  }

  const handleEdit = (feature) => {
    setEditingFeature(feature)
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      order_index: feature.order_index
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      await deleteFeature(id)
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: '', order_index: 0 })
    setEditingFeature(null)
    setShowAddForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Features Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Feature
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingFeature ? 'Edit Feature' : 'Add New Feature'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="🔒"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : (editingFeature ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Features List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current Features</h3>
          
          {features.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No features found. Add your first feature!</p>
          ) : (
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{feature.icon}</span>
                        <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(feature)}
                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(feature.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturesManager