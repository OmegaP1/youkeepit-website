// src/components/sections/Hero.js
'use client';

import React, { useState, useEffect } from 'react';
import { DatabaseService } from '@/services/database';
import { GeometricPattern } from '@/components/backgrounds';

const Hero = ({ darkMode }) => {
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch hero section content from database
        const contentData = await DatabaseService.getSiteContent('hero');
        const content = {};
        contentData.forEach(item => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error('Error fetching hero content:', error);
        // Fallback to default content if DB fails
        setSiteContent({
          title: 'Transform IT Equipment Transitions',
          subtitle:
            'Turn departing employee devices into valuable assets for your team while maximizing recovery and minimizing waste.',
          cta_primary: 'Start Free Trial',
          cta_secondary: 'Watch Demo',
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
        className={`relative pt-32 pb-20 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        {/* Background Pattern */}
        <GeometricPattern darkMode={darkMode} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div
                className={`h-12 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-3/4 mx-auto mb-6`}
              ></div>
              <div
                className={`h-6 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-full mx-auto mb-2`}
              ></div>
              <div
                className={`h-6 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-5/6 mx-auto mb-8`}
              ></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  className={`h-12 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded w-40`}
                ></div>
                <div
                  className={`h-12 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded w-32`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className={`relative pt-32 pb-20 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Background Pattern */}
      <GeometricPattern darkMode={darkMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'Transform IT Equipment Transitions'}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.subtitle ||
              'Turn departing employee devices into valuable assets for your team while maximizing recovery and minimizing waste.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {siteContent.cta_primary || 'Start Free Trial'}
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('how-it-works');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              {siteContent.cta_secondary || 'Watch Demo'}
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? 'bg-gray-800 text-gray-300 border border-gray-700'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Trusted by 500+ companies worldwide</span>
          </div>
        </div>

        {/* Three Cards Section - Original Design */}
        <div className="mt-20 relative">
          <div className="grid md:grid-cols-3 gap-8 opacity-80">
            <div
              className={`p-6 rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="text-4xl mb-3">💼</div>
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Employee Departure
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Automated workflow triggers
              </p>
            </div>
            <div
              className={`p-6 rounded-2xl shadow-lg transform -rotate-1 hover:rotate-0 transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="text-4xl mb-3">🔄</div>
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Device Processing
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Secure data wiping & assessment
              </p>
            </div>
            <div
              className={`p-6 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="text-4xl mb-3">🛒</div>
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Employee Marketplace
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Staff purchase at great prices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;