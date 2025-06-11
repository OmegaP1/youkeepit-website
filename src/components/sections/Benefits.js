'use client'

import React from 'react'

const Benefits = ({ darkMode }) => {
  const benefits = [
    {
      title: "For Companies",
      description: "Recover 60-80% of device value, reduce storage costs, ensure compliance, and strengthen employee satisfaction.",
      icon: "🏢",
      color: "text-green-600"
    },
    {
      title: "For Employees", 
      description: "Access quality refurbished devices at 40-60% below market price with warranty and support included.",
      icon: "👥",
      color: "text-blue-600"
    },
    {
      title: "For IT Teams",
      description: "Streamlined workflows, automated compliance reporting, and reduced manual processing time.",
      icon: "💻",
      color: "text-purple-600"
    }
  ]

  return (
    <section id="benefits" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Benefits for Everyone
            </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl">{benefit.icon}</div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${benefit.color}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              ROI Calculator
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Devices per year</span>
                <span className="font-semibold text-gray-900">250</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Avg. device value</span>
                <span className="font-semibold text-gray-900">$1,200</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Recovery rate</span>
                <span className="font-semibold text-green-600">70%</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-green-50 rounded-lg px-4">
                <span className="font-semibold text-gray-900">Annual Savings</span>
                <span className="text-2xl font-bold text-green-600">$210,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits