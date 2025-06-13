// src/components/admin/PricingManager.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { useAdminActions } from '@/hooks/useAdminActions'

const PricingManager = () => {
  const { pricingPlans } = useContent()
  const { createPricingPlan, updatePricingPlan, deletePricingPlan, saving } = useAdminActions()
  const [editingPlan, setEditingPlan] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: '',
    description: '',
    features: [],
    is_popular: false,
    order_index: 0
  })

  const [newFeature, setNewFeature] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let success
    if (editingPlan) {
      success = await updatePricingPlan(editingPlan.id, formData)
    } else {
      success = await createPricingPlan(formData)
    }

    if (success) {
      setFormData({ name: '', price: '', period: '', description: '', features: [], is_popular: false, order_index: 0 })
      setEditingPlan(null)
      setShowAddForm(false)
    }
  }

  const handleEdit = (plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period || '',
      description: plan.description,
      features: Array.isArray(plan.features) ? plan.features : [],
      is_popular: plan.is_popular,
      order_index: plan.order_index
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      await deletePricingPlan(id)
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  const resetForm = () => {
    setFormData({ name: '', price: '', period: '', description: '', features: [], is_popular: false, order_index: 0 })
    setEditingPlan(null)
    setShowAddForm(false)
    setNewFeature('')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pricing Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Pricing Plan
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="$29"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="/month"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Perfect for small teams"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 p-2 bg-gray-50 rounded">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Add a feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_popular"
                checked={formData.is_popular}
                onChange={(e) => setFormData({...formData, is_popular: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="is_popular" className="text-sm font-medium text-gray-700">
                Mark as popular plan
              </label>
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
                {saving ? 'Saving...' : (editingPlan ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pricing Plans List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current Pricing Plans</h3>
          
          {pricingPlans.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pricing plans found. Add your first plan!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className={`border rounded-lg p-4 ${plan.is_popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{plan.name}</h4>
                      {plan.is_popular && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded-full">Popular</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{plan.price}</div>
                      {plan.period && <div className="text-sm text-gray-600">{plan.period}</div>}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{plan.description}</p>
                  
                  <div className="space-y-1 mb-4">
                    {Array.isArray(plan.features) && plan.features.map((feature, index) => (
                      <div key={index} className="text-sm text-gray-600">• {feature}</div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="flex-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
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

export default PricingManager