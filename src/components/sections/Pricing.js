'use client'

import React from 'react'

const Pricing = ({ darkMode }) => {
  const plans = [
    {
      name: "Demo",
      price: "Get Started",
      period: "",
      description: "See YouKeepIt in action",
      features: [
        "Live platform demonstration",
        "Personalized consultation",
        "ROI analysis for your company",
        "Implementation timeline",
      ],
      popular: false,
      isDemo: true,
    },
    {
      name: "Professional",
      price: "$999",
      period: "/month",
      description: "Most popular for growing companies",
      features: [
        "Up to 500 devices/year",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access",
      ],
      popular: true,
      isDemo: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited devices",
        "Dedicated success manager",
        "Custom integrations",
        "Advanced compliance",
        "SLA guarantee",
      ],
      popular: false,
      isDemo: false,
    },
  ];

  return (
    <section id="pricing" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Simple, Transparent Pricing
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            No hidden fees. Pay only for successful transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 scale-105' 
                : darkMode
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-200 bg-white hover:border-gray-300'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-lg ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-green-600 mr-3 flex-shrink-0 mt-0.5">✓</span>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : plan.isDemo
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.isDemo ? "Schedule Demo" : plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Need a custom solution? We'll work with you to create the perfect plan.
          </p>
          <button className={`border px-8 py-3 rounded-lg font-semibold transition-colors ${
            darkMode
              ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
              : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
          }`}>
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing