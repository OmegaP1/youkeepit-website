// src/components/sections/Features.js
'use client';

import React, { useState, useEffect } from 'react';
import { DatabaseService } from '@/services/database';
import { GradientMesh } from '@/components/backgrounds';

const Features = ({ darkMode }) => {
  const [features, setFeatures] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch features from database
        const featuresData = await DatabaseService.getFeatures();
        setFeatures(featuresData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent('features');
        const content = {};
        contentData.forEach(item => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error('Error fetching features data:', error);
        // Fallback to default data if DB fails
        setFeatures([
          {
            title: 'Enterprise Security',
            description:
              'Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.',
            icon: '🔒',
          },
          {
            title: 'Employee Portal',
            description:
              'Self-service marketplace where employees can browse, purchase, and track their orders.',
            icon: '👥',
          },
          {
            title: 'Analytics Dashboard',
            description:
              'Real-time insights into asset recovery, cost savings, and environmental impact.',
            icon: '📊',
          },
          {
            title: 'Automated Workflows',
            description:
              'Streamlined processes for device preparation, data wiping, and documentation.',
            icon: '⚙️',
          },
          {
            title: 'Integration Ready',
            description:
              'Seamlessly connects with your existing HRIS, asset management, and IT systems.',
            icon: '🔗',
          },
          {
            title: 'White-Label Option',
            description:
              'Customize the platform with your branding for a seamless employee experience.',
            icon: '🎨',
          },
        ]);
        setSiteContent({
          title: 'Powerful Features',
          description:
            'Everything you need to manage IT equipment transitions efficiently and securely.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section
        className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        {/* Background Pattern */}
        <GradientMesh darkMode={darkMode} />

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl animate-pulse border ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div
                  className={`h-12 w-12 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded mb-4`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded mb-4 w-32`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded w-3/4`}
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
      id="features"
      className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Background Pattern */}
      <GradientMesh darkMode={darkMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'Powerful Features'}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.description ||
              'Everything you need to manage IT equipment transitions efficiently and securely.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className={`p-6 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl group ${
                darkMode
                  ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-800'
                  : 'bg-gray-50/80 border-gray-200 hover:shadow-2xl hover:bg-white'
              }`}
            >
              {/* Feature Icon */}
              <div className="mb-4">
                <div
                  className={`text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    darkMode ? 'opacity-90' : 'opacity-80'
                  }`}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Feature Title */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p
                className={`leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div
                className={`mt-4 w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12 ${
                  darkMode ? 'bg-blue-500' : 'bg-blue-600'
                }`}
              ></div>
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
            Ready to experience these powerful features?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('pricing');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Explore Pricing Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;