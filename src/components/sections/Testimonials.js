'use client'

import React from 'react'

const Testimonials = ({ darkMode }) => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "IT Director, TechCorp",
      content:
        "YouKeepIt transformed our equipment transition process. We've recovered over $500k in value this year alone while making our employees happy.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "HR Manager, GrowthCo",
      content:
        "The employee marketplace is brilliant. Our staff love getting quality devices at great prices, and we've eliminated equipment storage costs.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "CFO, ScaleTech",
      content:
        "The ROI was immediate. We implemented YouKeepIt in one day and started seeing savings within the first week. Incredible platform.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Trusted by Leading Companies
          </h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            See what our customers are saying about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
              }`}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p
                className={`mb-6 text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{testimonial.content}"
              </p>
              <div>
                <div
                  className={`font-semibold text-lg ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {testimonial.name}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p
            className={`text-lg mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join hundreds of companies already using YouKeepIt
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("pricing");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Free Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials