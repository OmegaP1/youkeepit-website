// src/app/admin/components/testimonials/TestimonialsManager.js
"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TestimonialsList from "./components/TestimonialsList";
import TestimonialForm from "./components/TestimonialForm";
import { useTestimonials } from "./hooks/useTestimonials";

export default function TestimonialsManager({ showMessage }) {
  const { testimonials, loading, fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleCreate = async (testimonialData) => {
    const success = await createTestimonial(testimonialData);
    if (success) {
      showMessage("success", "Testimonial created successfully!");
      setShowAddForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create testimonial");
      return false;
    }
  };

  const handleUpdate = async (id, testimonialData) => {
    const success = await updateTestimonial(id, testimonialData);
    if (success) {
      showMessage("success", "Testimonial updated successfully!");
      setEditingTestimonial(null);
      return true;
    } else {
      showMessage("error", "Failed to update testimonial");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteTestimonial(id);
    if (success) {
      showMessage("success", "Testimonial deleted successfully!");
    } else {
      showMessage("error", "Failed to delete testimonial");
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTestimonial(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Testimonials Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {showAddForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSubmit={editingTestimonial ? 
            (data) => handleUpdate(editingTestimonial.id, data) : 
            handleCreate
          }
          onCancel={handleCancelEdit}
        />
      )}

      <TestimonialsList
        testimonials={testimonials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}