// src/components/admin/FAQManager.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { useAdminActions } from '@/hooks/useAdminActions'

const FAQManager = () => {
  const { faqItems } = useContent()
  const { createFAQItem, updateFAQItem, deleteFAQItem, saving } = useAdminActions()
  const [editingFAQ, setEditingFAQ] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    order_index: 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let success
    if (editingFAQ) {
      success = await updateFAQItem(editingFAQ.id, formData)
    } else {
      success = await createFAQItem(formData)
    }

    if (success) {
      setFormData({ question: '', answer: '', category: '', order_index: 0 })
      setEditingFAQ(null)
      setShowAddForm(false)
    }
  }

  const handleEdit = (faq) => {
    setEditingFAQ(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      order_index: faq.order_index
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this FAQ item?')) {
      await deleteFAQItem(id)
    }
  }

  const resetForm = () => {
    setFormData({ question: '', answer: '', category: '', order_index: 0 })
    setEditingFAQ(null)
    setShowAddForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">FAQ Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add FAQ Item
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingFAQ ? 'Edit FAQ Item' : 'Add New FAQ Item'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="General, Pricing, Technical, etc."
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
                {saving ? 'Saving...' : (editingFAQ ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current FAQ Items</h3>
          
          {faqItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No FAQ items found. Add your first FAQ!</p>
          ) : (
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 mb-2">{faq.answer}</p>
                      {faq.category && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {faq.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
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

export default FAQManager