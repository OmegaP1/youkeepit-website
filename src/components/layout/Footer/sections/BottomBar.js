// src/components/layout/Footer/sections/BottomBar.js
'use client'

import React from 'react'

const BottomBar = ({ darkMode }) => {
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR Compliance', href: '/gdpr' },
  ];

  return (
    <div
      className={`border-t pt-8 transition-all duration-300 ${
        darkMode ? 'border-white/10' : 'border-gray-200'
      }`}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        {/* Copyright */}
        <div className="flex items-center space-x-4">
          <p
            className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            &copy; 2025 KeepMyKit. All rights reserved.
          </p>

          {/* Security Badge */}
          <div
            className={`hidden sm:flex items-center space-x-2 px-3 py-1 border rounded-full transition-all duration-300 ${
              darkMode
                ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20'
                : 'bg-green-50 border-green-200 hover:bg-green-100'
            }`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span
              className={`text-xs font-medium transition-colors duration-300 ${
                darkMode ? 'text-green-300' : 'text-green-600'
              }`}
            >
              SSL Secured
            </span>
          </div>

          {/* Night Mode Badge */}
          {darkMode && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-all duration-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 text-xs font-medium">
                Night Mode
              </span>
            </div>
          )}
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center gap-6">
          {legalLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`text-sm transition-all duration-300 hover:underline ${
                darkMode
                  ? 'text-gray-400 hover:text-white decoration-blue-400'
                  : 'text-gray-600 hover:text-gray-900 decoration-blue-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className={`flex items-center space-x-4 text-xs transition-colors duration-300 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          <span className="flex items-center">
            Made with ❤️ in Portugal
            {darkMode && <span className="ml-1">🌙</span>}
          </span>
          <span>•</span>
          <span className="flex items-center">
            Version 2.1.0
            {darkMode && <span className="ml-1 text-blue-400">★</span>}
          </span>
        </div>
      </div>

      {/* Night Mode Footer Animation */}
      {darkMode && (
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar