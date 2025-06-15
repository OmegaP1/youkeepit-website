// src/components/sections/Problem.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";
import { CircuitPattern } from '@/components/backgrounds';

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
          cta_text: 'See How We Solve This',
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
        className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        {/* Background Pattern */}
        <CircuitPattern darkMode={darkMode} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
      className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
    >
      {/* Background Pattern */}
      <CircuitPattern darkMode={darkMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
              {/* Stat Value */}
              <div
                className={`text-4xl font-bold mb-3 ${
                  stat.color || 'text-red-500'
                }`}
              >
                {stat.value}
              </div>

              {/* Stat Label */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {stat.label}
              </h3>

              {/* Stat Description */}
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {stat.description}
              </p>

              {/* Decorative Element */}
              <div
                className={`mt-4 w-12 h-1 mx-auto rounded-full ${
                  stat.color?.includes('red')
                    ? 'bg-red-500'
                    : stat.color?.includes('orange')
                      ? 'bg-orange-500'
                      : 'bg-red-500'
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
            {siteContent.subtitle ||
              "Don't let equipment transitions drain your resources"}
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('how-it-works');
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
            {siteContent.cta_text || 'See How We Solve This'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problem;