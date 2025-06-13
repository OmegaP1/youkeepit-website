// src/components/sections/HowItWorks.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const HowItWorks = ({ darkMode }) => {
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  // Default steps as fallback
  const defaultSteps = [
    {
      step: 1,
      title: "Upload Inventory",
      description:
        "Simply upload your device inventory or integrate with existing asset management systems.",
      color: "bg-blue-600",
    },
    {
      step: 2,
      title: "Employee Marketplace",
      description:
        "Employees browse available devices at discounted rates through our secure platform.",
      color: "bg-green-600",
    },
    {
      step: 3,
      title: "Secure Transfer",
      description:
        "Automated data wiping, documentation, and secure handover process with full compliance tracking.",
      color: "bg-purple-600",
    },
  ];

  const [steps] = useState(defaultSteps);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent(
          "how_it_works"
        );
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching how it works content:", error);
        // Fallback to default content if DB fails
        setSiteContent({
          title: "How YouKeepIt Works",
          description:
            "Transform your IT equipment lifecycle in three simple steps",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-64 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-80 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="text-center animate-pulse">
                <div
                  className={`w-16 h-16 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded-full mx-auto mb-6`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-32 mx-auto mb-4`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-48 mx-auto mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-40 mx-auto`}
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
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {siteContent.title || "How YouKeepIt Works"}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {siteContent.description ||
              "Transform your IT equipment lifecycle in three simple steps"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="text-center relative">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block absolute top-8 left-1/2 w-full h-0.5 transform translate-x-8 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                  style={{ zIndex: 0 }}
                ></div>
              )}

              {/* Step Circle */}
              <div className="relative z-10 mb-6">
                <div
                  className={`w-16 h-16 ${step.color} rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                >
                  {step.step}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
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
            Ready to streamline your IT equipment management?
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
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
