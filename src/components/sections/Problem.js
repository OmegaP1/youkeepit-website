// src/components/sections/Problem.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Problem = ({ darkMode }) => {
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  // Default problem statistics as fallback
  const problemStats = [
    {
      value: "$3,200",
      label: "Lost Per Device",
      description:
        "Average value lost when equipment is improperly disposed of or stored in warehouses.",
      color: "text-red-500",
    },
    {
      value: "2-3",
      label: "Weeks Delay",
      description:
        "Typical time to complete equipment transitions, affecting productivity and security.",
      color: "text-red-500",
    },
    {
      value: "73%",
      label: "Compliance Risk",
      description:
        "Companies that don't properly wipe data face potential security breaches and compliance issues.",
      color: "text-red-500",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent("problem");
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching problem content:", error);
        // Fallback to default content if DB fails
        setSiteContent({
          title: "The Hidden Cost of IT Equipment Transitions",
          description:
            "When employees leave or upgrade devices, most companies face significant challenges",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-96 mx-auto mb-4`}
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
              <div
                key={index}
                className={`p-8 rounded-2xl text-center animate-pulse ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div
                  className={`h-12 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-20 mx-auto mb-4`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-24 mx-auto mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-40 mx-auto mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-32 mx-auto`}
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
      className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {siteContent.title || "The Hidden Cost of IT Equipment Transitions"}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {siteContent.description ||
              "When employees leave or upgrade devices, most companies face significant challenges"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problemStats.map((stat, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl text-center transition-all duration-200 hover:transform hover:-translate-y-1 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-650 border border-gray-600"
                  : "bg-white hover:shadow-lg border border-gray-200"
              }`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold mb-3 ${stat.color}`}
              >
                {stat.value}
              </div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.label}
              </h3>
              <p
                className={`leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Problem List */}
        <div className="mt-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`p-8 rounded-2xl ${
                darkMode
                  ? "bg-gray-700 border border-gray-600"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ❌ Current Challenges
              </h3>
              <ul className="space-y-3">
                {[
                  "Devices sitting in storage for months",
                  "Manual data wiping processes",
                  "Unclear asset recovery value",
                  "Complex compliance requirements",
                  "Employee frustration with slow transitions",
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`p-8 rounded-2xl ${
                darkMode
                  ? "bg-gray-700 border border-gray-600"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ✅ YouKeepIt Solution
              </h3>
              <ul className="space-y-3">
                {[
                  "Automated workflow from day one",
                  "Military-grade data security",
                  "AI-powered value optimization",
                  "Built-in compliance tracking",
                  "Happy employees with great deals",
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p
            className={`text-lg mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't let IT equipment transitions drain your resources
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("how-it-works");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            See How We Solve This
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problem;
