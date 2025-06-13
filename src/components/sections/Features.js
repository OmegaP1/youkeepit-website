// src/components/sections/Features.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

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
        const contentData = await DatabaseService.getSiteContent("features");
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching features data:", error);
        // Fallback to empty data if DB fails
        setFeatures([]);
        setSiteContent({
          title: "Powerful Features",
          description:
            "Everything you need to manage IT equipment transitions efficiently and securely.",
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
                } rounded w-96 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-200 animate-pulse ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } mb-4`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded mb-3`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
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
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {siteContent.title || "Powerful Features"}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {siteContent.description ||
              "Everything you need to manage IT equipment transitions efficiently and securely."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-8 rounded-2xl border transition-all duration-200 hover:transform hover:-translate-y-1 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                  : "bg-gray-50 hover:bg-white hover:shadow-lg border border-gray-100"
              }`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3
                className={`text-lg font-semibold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
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
            Ready to experience these powerful features?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("pricing");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
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
