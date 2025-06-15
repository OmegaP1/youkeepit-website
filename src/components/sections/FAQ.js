// src/components/sections/FAQ.js
'use client';

import React, { useState, useEffect } from 'react';
import { DatabaseService } from '@/services/database';
import { CodeMatrix } from '@/components/backgrounds';

const FAQ = ({ darkMode }) => {
  const [faqItems, setFaqItems] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch FAQ items from database
        const faqData = await DatabaseService.getFAQItems();
        setFaqItems(faqData);

        // Fetch section content from database
        const contentData = await DatabaseService.getSiteContent('faq');
        const content = {};
        contentData.forEach(item => {
          content[item.content_key] = item.content_value;
        });
        setSiteContent(content);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
        // Fallback to default data if DB fails
        setFaqItems([
          {
            question: 'How secure is the data wiping process?',
            answer:
              'We use DOD 5220.22-M certified data destruction methods with multiple overwrite passes. All processes are documented and compliance certificates are provided.',
          },
          {
            question: 'What happens if an employee damages a device?',
            answer:
              'Our platform includes condition assessment tools and pricing adjustments. Employees are informed of any damage costs before purchase, ensuring transparency.',
          },
          {
            question: 'How quickly can we get started?',
            answer:
              'Most organizations are up and running within 24-48 hours. Our onboarding team handles the initial setup and integration with your existing systems.',
          },
          {
            question: 'Do you integrate with our HRIS system?',
            answer:
              'Yes, we integrate with popular HRIS platforms including Workday, BambooHR, ADP, and others through APIs and automated data sync.',
          },
          {
            question: 'What if we have compliance requirements?',
            answer:
              'YouKeepIt is SOC 2 Type II certified and complies with GDPR, HIPAA, and other industry standards. We provide all necessary documentation for audits.',
          },
          {
            question: 'Can we integrate with our existing IT systems?',
            answer:
              'Absolutely. We integrate with popular HRIS, asset management, and IT service management platforms through APIs and custom integrations.',
          },
        ]);
        setSiteContent({
          title: 'Frequently Asked Questions',
          description: 'Get answers to common questions about YouKeepIt',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleItem = index => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  if (loading) {
    return (
      <section
        className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        {/* Background Pattern */}
        <CodeMatrix darkMode={darkMode} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div
                className={`h-8 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-64 mx-auto mb-4`}
              ></div>
              <div
                className={`h-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } rounded w-96 mx-auto`}
              ></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border animate-pulse ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div
                  className={`h-6 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded mb-4 w-3/4`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } rounded mb-2`}
                ></div>
                <div
                  className={`h-4 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
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
      className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      {/* Background Pattern */}
      <CodeMatrix darkMode={darkMode} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteContent.title || 'Frequently Asked Questions'}
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {siteContent.description ||
              'Get answers to common questions about YouKeepIt'}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id || index}
              className={`rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                darkMode
                  ? 'bg-gray-700/80 border-gray-600 hover:bg-gray-700'
                  : 'bg-gray-50/80 border-gray-200 hover:bg-white'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-6 text-left flex items-center justify-between transition-colors duration-200 ${
                  openItems.has(index)
                    ? darkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : darkMode
                      ? 'text-white hover:text-blue-400'
                      : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                <span className="font-semibold text-lg pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 flex-shrink-0 ${
                    openItems.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItems.has(index)
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div
                    className={`w-full h-px mb-4 ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}
                  ></div>
                  <p
                    className={`leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p
            className={`text-lg mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Contact Support
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                  : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;