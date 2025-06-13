// src/components/sections/Benefits.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Benefits = ({ darkMode }) => {
  const [companyStats, setCompanyStats] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch company stats from database
        const statsData = await DatabaseService.getCompanyStats();
        setCompanyStats(statsData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent("benefits");
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching benefits data:", error);
        // Fallback to default data if DB fails
        setCompanyStats([
          {
            value: "87%",
            label: "Cost Reduction",
            description: "Average cost reduction achieved by our clients",
          },
          {
            value: "24hrs",
            label: "Setup Time",
            description: "Quick implementation and setup process",
          },
          {
            value: "500+",
            label: "Companies",
            description: "Trusted by leading organizations worldwide",
          },
        ]);
        setSiteContent({
          title: "Why Choose YouKeepIt?",
          description:
            "Discover the advantages that make us the preferred choice for IT equipment management",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-80 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-96 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div
                  className={`h-16 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-32 mx-auto mb-4`}
                ></div>
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-24 mx-auto mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-48 mx-auto`}
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
      className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {siteContent.title || "Why Choose YouKeepIt?"}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {siteContent.description ||
              "Discover the advantages that make us the preferred choice for IT equipment management"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {companyStats.map((stat, index) => (
            <div
              key={stat.id || index}
              className={`p-8 rounded-2xl transition-all duration-200 hover:transform hover:-translate-y-1 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-650"
                  : "bg-gray-50 hover:bg-white hover:shadow-lg"
              }`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold mb-3 ${
                  stat.color || (darkMode ? "text-blue-400" : "text-blue-600")
                }`}
              >
                {stat.value}
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.label}
              </h3>
              {stat.description && (
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.description}
                </p>
              )}
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
            Ready to transform your IT equipment management?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("features");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
