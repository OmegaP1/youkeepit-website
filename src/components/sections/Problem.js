// src/components/sections/Problem.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Problem = ({ darkMode }) => {
  const [problemStats, setProblemStats] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch problem statistics from database
        const statsData = await DatabaseService.getProblemStats();
        setProblemStats(statsData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent('problem');
        const content = {};
        contentData.forEach(item => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error('Error fetching problem data:', error);
        // Fallback to default data if DB fails
        setProblemStats([
          {
            value: '$3,200',
            label: 'Lost Per Device',
            description:
              'Average value lost when equipment is improperly disposed of or stored in warehouses.',
            color: 'text-red-500',
          },
          {
            value: '2-3',
            label: 'Weeks Delay',
            description:
              'Typical time to complete equipment transitions, affecting productivity and security.',
            color: 'text-red-500',
          },
          {
            value: '73%',
            label: 'Compliance Risk',
            description:
              "Companies that don't properly wipe data face potential security breaches and compliance issues.",
            color: 'text-red-500',
          },
        ]);
        setSiteContent({
          title: 'The Hidden Cost of IT Equipment Transitions',
          description:
            'When employees leave or upgrade devices, most companies face significant challenges',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-96 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-80 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl text-center animate-pulse border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div
                  className={`h-12 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded w-20 mx-auto mb-4`}
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
      id="problem"
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'The Hidden Cost of IT Equipment Transitions'}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.description ||
              'When employees leave or upgrade devices, most companies face significant challenges'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problemStats.map((stat, index) => (
            <div
              key={stat.id || index}
              className={`p-8 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 border shadow-lg hover:shadow-xl ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                  : 'bg-white border-gray-200 hover:shadow-2xl'
              }`}
            >
              {/* Icon or Graphic Element */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    darkMode
                      ? 'bg-red-900/30 border-2 border-red-500/30'
                      : 'bg-red-50 border-2 border-red-100'
                  }`}
                >
                  {/* Dynamic icon based on stat label */}
                  {stat.label?.toLowerCase().includes('lost') ? (
                    // Money/Cost icon for Lost Per Device
                    <svg
                      className={`w-8 h-8 ${stat.color || 'text-red-500'}`}
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
                  ) : stat.label?.toLowerCase().includes('delay') ? (
                    // Clock icon for Weeks Delay
                    <svg
                      className={`w-8 h-8 ${stat.color || 'text-red-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : stat.label?.toLowerCase().includes('compliance') ||
                    stat.label?.toLowerCase().includes('risk') ? (
                    // Shield alert icon for Compliance Risk
                    <svg
                      className={`w-8 h-8 ${stat.color || 'text-red-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                      />
                    </svg>
                  ) : (
                    // Default warning triangle icon
                    <svg
                      className={`w-8 h-8 ${stat.color || 'text-red-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Statistic Value */}
              <div
                className={`text-4xl font-bold mb-3 ${
                  stat.color || 'text-red-500'
                }`}
              >
                {stat.value}
              </div>

              {/* Statistic Label */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {stat.label}
              </h3>

              {/* Description */}
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p
            className={`text-lg mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.subtitle ||
              "Don't let equipment transitions drain your resources"}
          </p>
          <button
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            {siteContent.cta_text || 'See How We Solve This'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problem;