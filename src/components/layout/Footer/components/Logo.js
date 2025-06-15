// src/components/layout/Footer/components/Logo.js
'use client'

import React from 'react'

const Logo = ({ darkMode }) => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      {/* Logo Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-105 ${
          darkMode
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25'
            : 'bg-gradient-to-br from-blue-600 to-purple-700 shadow-lg shadow-blue-600/25'
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        {/* Night Mode Glow */}
        {darkMode && (
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        )}
      </div>

      {/* Company Name */}
      <div className="flex flex-col">
        <h3
          className={`text-2xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          YouKeepIt
          {darkMode && <span className="ml-1 text-blue-400 text-lg">✦</span>}
        </h3>
        <p
          className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {darkMode
            ? 'Secure • Sustainable • Night Ready'
            : 'Secure • Sustainable • Trusted'}
        </p>
      </div>
    </div>
  );
};

export default Logo