'use client'

import React from 'react'

const Features = ({ darkMode }) => {
  const features = [
    {
      icon: "🔒",
      title: "Enterprise Security",
      description:
        "Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.",
    },
    {
      icon: "👥",
      title: "Employee Portal",
      description:
        "Self-service marketplace where employees can browse, purchase, and track their orders.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description:
        "Real-time insights into asset recovery, cost savings, and environmental impact.",
    },
    {
      icon: "⚙️",
      title: "Automated Workflows",
      description:
        "Streamlined processes for device preparation, data wiping, and documentation.",
    },
    {
      icon: "🔗",
      title: "Integration Ready",
      description:
        "Seamlessly connects with your existing HRIS, asset management, and IT systems.",
    },
    {
      icon: "🎨",
      title: "White-Label Option",
      description:
        "Customize the platform with your branding for a seamless employee experience.",
    },
  ];

  return (
    <section
      id="features"
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Powerful Features
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Everything you need to manage IT equipment transitions efficiently
            and securely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
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

export default Features