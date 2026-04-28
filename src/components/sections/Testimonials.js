// src/components/sections/Testimonials.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Testimonials = ({ darkMode }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch testimonials from database
        const testimonialsData = await DatabaseService.getTestimonials();
        setTestimonials(testimonialsData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent(
          "testimonials"
        );
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching testimonials data:", error);
        // Fallback to empty data if DB fails
        setTestimonials([]);
        setSiteContent({
          title: "Trusted by Leading Companies",
          description:
            "See what our customers are saying about their experience",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-80 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-96 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-200 animate-pulse ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded mb-4 w-24`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-3/4 mb-6`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-32 mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-40`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'Trusted by Leading Companies'}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.description ||
              'See what our customers are saying about their experience'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className={`p-8 rounded-2xl border transition-all duration-200 hover:transform hover:-translate-y-1 ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-650 border-gray-600'
                  : 'bg-gray-50 hover:bg-white hover:shadow-lg border-gray-200'
              }`}
            >
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p
                className={`mb-6 text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                "{testimonial.content}"
              </p>
              <div>
                <div
                  className={`font-semibold text-lg ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {testimonial.name}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p
            className={`text-lg mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Join hundreds of companies already using KeepMyKit
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('pricing');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
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

export default Testimonials;
