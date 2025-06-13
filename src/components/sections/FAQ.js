// src/components/sections/FAQ.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const FAQ = ({ darkMode }) => {
  const [faqItems, setFaqItems] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch FAQ items from database
        const faqData = await DatabaseService.getFAQItems();
        setFaqItems(faqData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent("faq");
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        // Fallback to empty data if DB fails
        setFaqItems([]);
        setSiteContent({
          title: "Frequently Asked Questions",
          description: "Get answers to common questions about YouKeepIt",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleItem = (itemId) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`border rounded-xl p-6 animate-pulse ${
                  darkMode
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded mb-4 w-3/4`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded w-5/6`}
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
      id="faq"
      className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {siteContent.title || "Frequently Asked Questions"}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {siteContent.description ||
              "Get answers to common questions about YouKeepIt"}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl transition-all duration-200 ${
                darkMode
                  ? "border-gray-600 bg-gray-700 hover:bg-gray-650"
                  : "border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md"
              }`}
            >
              <button
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex justify-between items-start">
                  <h3
                    className={`text-lg font-semibold pr-8 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 transition-transform duration-200 ${
                      openItems[item.id] ? "transform rotate-180" : ""
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {openItems[item.id] && (
                <div className="px-6 pb-6">
                  <div
                    className={`text-base leading-relaxed border-t pt-4 ${
                      darkMode
                        ? "text-gray-300 border-gray-600"
                        : "text-gray-600 border-gray-200"
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
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
            Still have questions? We're here to help.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
