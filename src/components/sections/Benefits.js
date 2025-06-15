// src/components/sections/Benefits.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";
import { ParticleField } from '@/components/backgrounds';

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
          cta_text: 'Explore Features',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get appropriate icon based on benefit title
  const getIcon = title => {
    const iconMap = {
      'Cost Reduction': '💰',
      'Quick Setup': '⚡',
      'Employee Satisfaction': '😊',
      'Compliance Ready': '🔒',
      'Enterprise Security': '🛡️',
      'Automated Workflows': '⚙️',
      'Analytics Dashboard': '📊',
      'Integration Ready': '🔗',
    };
    return iconMap[title] || '✨';
  };

  if (loading) {
    return (
      <section
        className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        {/* Background Pattern */}
        <ParticleField darkMode={darkMode} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-64 mx-auto mb-4`}
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
                className={`p-6 rounded-2xl text-center animate-pulse border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div
                  className={`h-16 w-16 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded-full mx-auto mb-4`}
                ></div>
                <div
                  className={`h-8 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded mb-2 w-16 mx-auto`}
                ></div>
                <div
                  className={`h-4 ${
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
      className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
    >
      {/* Background Pattern */}
      <ParticleField darkMode={darkMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
              className={`p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl group ${
                darkMode
                  ? 'bg-gray-700/80 border-gray-600 hover:bg-gray-700'
                  : 'bg-white/90 border-gray-200 hover:shadow-2xl'
              }`}
            >
              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl transition-all duration-300 group-hover:scale-110 ${
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
            onClick={() => {
              const element = document.getElementById('features');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
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