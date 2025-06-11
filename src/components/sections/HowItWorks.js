'use client'

import React from 'react'

const HowItWorks = ({ darkMode }) => {
  const steps = [
    {
      step: 1,
      title: 'Upload Inventory',
      description: 'Simply upload your device inventory or integrate with existing asset management systems.',
      color: 'bg-blue-600'
    },
    {
      step: 2,
      title: 'Employee Marketplace',
      description: 'Employees browse available devices at discounted rates through our secure platform.',
      color: 'bg-green-600'
    },
    {
      step: 3,
      title: 'Secure Transfer',
      description: 'Automated data wiping, documentation, and secure handover process with full compliance tracking.',
      color: 'bg-purple-600'
    }
  ]

  return (
    <section id="how-it-works" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Simple 3-Step Process
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Transform your IT equipment management in minutes, not months.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Lines */}
          <div className="hidden md:flex justify-center items-center absolute top-8 left-0 right-0 z-0">
            <div className="flex-1 max-w-xs">
              <div className="h-0.5 bg-gradient-to-r from-blue-600 to-green-600"></div>
            </div>
            <div className="w-16"></div> {/* Space for middle circle */}
            <div className="flex-1 max-w-xs">
              <div className="h-0.5 bg-gradient-to-r from-green-600 to-purple-600"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                  {step.step}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to streamline your IT equipment management?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('pricing')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
