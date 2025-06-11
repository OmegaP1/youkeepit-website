'use client'

import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "IT Director, TechCorp",
      content: "YouKeepIt transformed our equipment transition process. We've recovered over $500k in value this year alone while making our employees happy.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "HR Manager, GrowthCo",
      content: "The employee marketplace is brilliant. Our staff love getting quality devices at great prices, and we've eliminated equipment storage costs.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "CFO, ScaleTech",
      content: "The ROI was immediate. We implemented YouKeepIt in one day and started seeing savings within the first week. Incredible platform.",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers are saying about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 rounded-xl bg-white shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900 text-lg">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials