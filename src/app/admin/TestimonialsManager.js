// src/components/admin/TestimonialsManager.js
'use client'

import React, { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { useAdminActions } from '@/hooks/useAdminActions'

const TestimonialsManager = () => {
  const { testimonials } = useContent()
  const { createTestimonial, updateTestimonial, deleteTestimonial, saving } = useAdminActions()
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    order_index: 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let success
    if (editingTestimonial) {
      success = await updateTestimonial(editingTestimonial.id, formData)
    } else {
      success = await createTestimonial(formData)
    }

    if (success) {
      setFormData({ name: '', role: '', company: '', content: '', rating: 5, order_index: 0 })
      setEditingTestimonial(null)
      setShowAddForm(false)
    }
  }

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating,
      order_index: testimonial.order_index
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', role: '', company: '', content: '', rating: 5, order_index: 0 })
    setEditingTestimonial(null)
    setShowAddForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Testimonial
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="IT Director"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="TechCorp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                ))}
              </select>
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
                {saving ? 'Saving...' : (editingTestimonial ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current Testimonials</h3>
          
          {testimonials.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No testimonials found. Add your first testimonial!</p>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{testimonial.role}</span>
                        {testimonial.company && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-600">{testimonial.company}</span>
                          </>
                        )}
                      </div>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                      <p className="text-gray-600">"{testimonial.content}"</p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialsManager