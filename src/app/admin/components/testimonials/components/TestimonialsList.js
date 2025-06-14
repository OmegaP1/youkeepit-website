// src/app/admin/components/testimonials/components/TestimonialsList.js
"use client";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialsList({ testimonials, onEdit, onDelete }) {
  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No testimonials found. Add your first testimonial!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Current Testimonials</h3>
      
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}