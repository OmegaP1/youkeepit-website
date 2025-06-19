// src/components/layout/Footer/sections/CompanySection.js
'use client'

import React from 'react'
import Logo from '../components/Logo'
import StatsGrid from '../components/StatsGrid'

const CompanySection = ({ darkMode }) => {
  return (
    <div className="space-y-8">
      {/* Logo and Company Info */}
      <div className="space-y-6">
        <Logo darkMode={darkMode} />

        <p
          className={`text-lg leading-relaxed max-w-md transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Transforming IT equipment transitions for companies through secure,
          sustainable, and employee-focused solutions that recover 60-80% of
          device value.
        </p>

        {/* Trust Badge */}
        <div
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
            darkMode
              ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20'
              : 'bg-green-100/50 border-green-200 hover:bg-green-100'
          }`}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span
            className={`text-sm font-medium transition-colors duration-300 ${
              darkMode ? 'text-green-300' : 'text-green-600'
            }`}
          >
            SOC 2 Type II Certified
          </span>
        </div>

        {/* Additional Night Mode Badge */}
        {darkMode && (
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 ml-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm font-medium">
              Night Mode Active
            </span>
          </div>
        )}
      </div>

      {/* Company Stats */}
      <StatsGrid darkMode={darkMode} />
    </div>
  );
};

export default CompanySection