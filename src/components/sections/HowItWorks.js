// src/components/sections/HowItWorks.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const HowItWorks = ({ darkMode }) => {
  const [steps, setSteps] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch how it works steps from database
        const stepsData = await DatabaseService.getHowItWorksSteps();
        setSteps(stepsData);

        // Fetch section content from database
        const contentData =
          await DatabaseService.getSiteContent('how_it_works');
        const content = {};
        contentData.forEach(item => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error('Error fetching how it works data:', error);
        // Fallback to default data if DB fails
        setSteps([
          {
            step_number: 1,
            title: 'Upload Inventory',
            description:
              'Simply upload your device inventory or integrate with existing asset management systems.',
            color: 'bg-blue-600',
          },
          {
            step_number: 2,
            title: 'Employee Marketplace',
            description:
              'Employees browse available devices at discounted rates through our secure platform.',
            color: 'bg-green-600',
          },
          {
            step_number: 3,
            title: 'Secure Transfer',
            description:
              'Automated data wiping, documentation, and secure handover process with full compliance tracking.',
            color: 'bg-purple-600',
          },
        ]);
        setSiteContent({
          title: 'How It Works',
          description:
            'Transform your IT equipment lifecycle in three simple steps',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`text-center animate-pulse ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } mx-auto mb-6`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded mb-4 w-32 mx-auto`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
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
      id="how-it-works"
      className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'How It Works'}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.description ||
              'Transform your IT equipment lifecycle in three simple steps'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id || index}
              className={`text-center group transition-all duration-300 hover:transform hover:-translate-y-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {/* Step Number Circle */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-full ${
                    step.color || 'bg-blue-600'
                  } text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  {step.step_number}
                </div>
                {/* Connector Line - Hide on last item */}
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block absolute top-8 left-1/2 w-full h-0.5 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } transform translate-x-8`}
                  ></div>
                )}
              </div>

              {/* Step Content */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {step.title}
              </h3>
              <p className="text-base leading-relaxed">{step.description}</p>
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
            {siteContent.cta_text || 'Get Started Today'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;