// src/components/sections/Pricing.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Pricing = ({ darkMode }) => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch pricing plans from database
        const plansData = await DatabaseService.getPricingPlans();
        setPricingPlans(plansData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent("pricing");
        const content = {};
        contentData.forEach((item) => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
        // Fallback to empty data if DB fails
        setPricingPlans([]);
        setSiteContent({
          title: "Simple, Transparent Pricing",
          description:
            "Choose the plan that fits your organization size and needs",
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
                } rounded w-80 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } rounded w-96 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border relative animate-pulse ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`h-6 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded mb-4 w-20`}
                ></div>
                <div
                  className={`h-10 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded mb-2 w-32`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded mb-6 w-24`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded mb-2`}
                ></div>
                <div className="space-y-3 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-4 ${
                        darkMode ? "bg-gray-700" : "bg-gray-300"
                      } rounded`}
                    ></div>
                  ))}
                </div>
                <div
                  className={`h-12 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded`}
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
      id="pricing"
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {siteContent.title || "Simple, Transparent Pricing"}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {siteContent.description ||
              "Choose the plan that fits your organization size and needs"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl border relative transition-all duration-200 hover:transform hover:-translate-y-1 ${
                plan.is_popular
                  ? darkMode
                    ? "bg-gradient-to-br from-blue-900 to-purple-900 border-blue-500 shadow-2xl shadow-blue-500/20"
                    : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-2xl shadow-blue-200/20"
                  : darkMode
                  ? "bg-gray-800 hover:bg-gray-750 border-gray-700"
                  : "bg-white hover:shadow-lg border-gray-200"
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-1">
                  <span
                    className={`text-4xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-lg ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {(plan.features || []).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  plan.is_popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    : darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
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
            Need a custom solution? Contact our sales team for enterprise
            pricing.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("faq");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
                : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            View FAQ
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
