'use client'

import React, { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How quickly can we implement YouKeepIt?",
      answer: "Most companies are up and running within 24 hours. Our onboarding team guides you through the simple setup process, and integration with existing systems typically takes just a few hours."
    },
    {
      question: "What happens to sensitive data on devices?",
      answer: "We use military-grade data wiping procedures that exceed DOD 5220.22-M standards. All data destruction is certified and documented for compliance purposes."
    },
    {
      question: "How do you determine device pricing for employees?",
      answer: "Our AI-powered pricing engine considers market value, device condition, age, and specs to offer fair pricing that benefits both the company and employees."
    },
    {
      question: "Can employees finance their purchases?",
      answer: "Yes, we offer flexible payment options including payroll deduction, monthly payment plans, and third-party financing options."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 technical support, dedicated customer success managers for Enterprise clients, and comprehensive documentation and training resources."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about YouKeepIt
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <span className={`text-2xl text-gray-400 transform transition-transform ${
                  openIndex === index ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQ