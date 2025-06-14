// src/components/sections/Benefits.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Benefits = ({ darkMode }) => {
  const [benefits, setBenefits] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch benefits from database
        const benefitsData = await DatabaseService.getBenefits();
        setBenefits(benefitsData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent('benefits');
        const content = {};
        contentData.forEach(item => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error('Error fetching benefits data:', error);
        // Fallback to default data if DB fails
        setBenefits([
          {
            title: 'Cost Reduction',
            description:
              'Reduce IT equipment disposal costs by up to 87% while generating revenue from device sales.',
            value: '87%',
            label: 'Cost Savings',
            color: 'text-blue-600',
          },
          {
            title: 'Quick Setup',
            description:
              'Get started in less than 24 hours with our streamlined onboarding process.',
            value: '24hrs',
            label: 'Setup Time',
            color: 'text-green-600',
          },
          {
            title: 'Employee Satisfaction',
            description:
              'Happy employees get quality devices at great prices while supporting sustainability.',
            value: '95%',
            label: 'Satisfaction Rate',
            color: 'text-purple-600',
          },
          {
            title: 'Compliance Ready',
            description:
              'Built-in security features ensure GDPR, SOC 2, and industry compliance requirements.',
            value: '100%',
            label: 'Compliance',
            color: 'text-red-600',
          },
        ]);
        setSiteContent({
          title: 'Why Choose YouKeepIt?',
          description:
            'Discover the advantages that make us the preferred choice for IT equipment management',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get icon based on benefit title
  const getIcon = title => {
    switch (title.toLowerCase()) {
      case 'cost reduction':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'quick setup':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case 'employee satisfaction':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'compliance ready':
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-80 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-96 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl text-center animate-pulse border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } mx-auto mb-6`}
                ></div>
                <div
                  className={`h-12 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded w-16 mx-auto mb-4`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded mb-4 w-24 mx-auto`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded mb-4 w-32 mx-auto`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded w-3/4 mx-auto`}
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
      id="benefits"
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'Why Choose YouKeepIt?'}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.description ||
              'Discover the advantages that make us the preferred choice for IT equipment management'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id || index}
              className={`p-8 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                  : 'bg-white border-gray-200 hover:shadow-2xl'
              }`}
            >
              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    benefit.color?.includes('blue')
                      ? darkMode
                        ? 'bg-blue-900/30 border-2 border-blue-500/30'
                        : 'bg-blue-50 border-2 border-blue-100'
                      : benefit.color?.includes('green')
                        ? darkMode
                          ? 'bg-green-900/30 border-2 border-green-500/30'
                          : 'bg-green-50 border-2 border-green-100'
                        : benefit.color?.includes('purple')
                          ? darkMode
                            ? 'bg-purple-900/30 border-2 border-purple-500/30'
                            : 'bg-purple-50 border-2 border-purple-100'
                          : darkMode
                            ? 'bg-red-900/30 border-2 border-red-500/30'
                            : 'bg-red-50 border-2 border-red-100'
                  }`}
                >
                  <div className={benefit.color || 'text-blue-600'}>
                    {getIcon(benefit.title)}
                  </div>
                </div>
              </div>

              {/* Value */}
              <div
                className={`text-4xl font-bold mb-3 ${
                  benefit.color || 'text-blue-600'
                }`}
              >
                {benefit.value}
              </div>

              {/* Label */}
              <div
                className={`text-sm font-medium mb-4 uppercase tracking-wide ${
                  benefit.color || 'text-blue-600'
                }`}
              >
                {benefit.label}
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {benefit.title}
              </h3>

              {/* Description */}
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            {siteContent.cta_text || 'Explore Features'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;