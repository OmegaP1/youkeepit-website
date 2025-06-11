'use client'

import React from 'react'

const Problem = ({ darkMode }) => {
  const problems = [
    {
      value: "$3,200",
      label: "Lost Per Device",
      description:
        "Average value lost when equipment is improperly disposed of or stored in warehouses.",
      color: "text-orange-500",
    },
    {
      value: "2-3",
      label: "Weeks Delay",
      description:
        "Typical time to complete equipment transitions, affecting productivity and security.",
      color: "text-amber-500",
    },
    {
      value: "73%",
      label: "Compliance Risk",
      description:
        "Companies that don't properly wipe data face potential security breaches and compliance issues.",
      color: "text-red-500",
    },
  ];

  return (
    <section
      id="problem"
      className={`py-20 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            The Hidden Costs of IT Equipment Management
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Most companies lose thousands of dollars annually due to inefficient
            equipment transitions and disposal processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up ${
                darkMode
                  ? "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800"
                  : "bg-white/80 backdrop-blur-sm border border-gray-100 hover:bg-white hover:shadow-lg"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`${problem.color} text-5xl font-bold mb-4 animate-pulse`}
              >
                {problem.value}
              </div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {problem.label}
              </h3>
              <p
                className={`leading-relaxed ${
                  darkMode ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <div
            className={`inline-flex items-center px-8 py-4 rounded-xl border-2 shadow-lg transform transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-700/50 text-orange-400 backdrop-blur-sm"
                : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 text-orange-700"
            }`}
          >
            <span className="text-2xl mr-3">💸</span>
            <span className="font-bold text-lg">
              Companies waste an average of $800k annually on poor equipment
              management
            </span>
          </div>
        </div>

        {/* Solution Teaser */}
        <div className="text-center mt-12 animate-fade-in">
          <p
            className={`text-lg mb-6 ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            There's a better way to handle IT equipment transitions.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("how-it-works");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            See Our Solution
          </button>
        </div>
      </div>
    </section>
  );
}

export default Problem
