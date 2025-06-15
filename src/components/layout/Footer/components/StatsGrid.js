// src/components/layout/Footer/components/StatsGrid.js
'use client'

import React from 'react'

const StatsGrid = ({ darkMode }) => {
  const stats = [
    {
      value: '500+',
      label: 'Companies',
      color: 'text-blue-400',
      bgColor: 'blue',
    },
    {
      value: '87%',
      label: 'Cost Reduction',
      color: 'text-green-400',
      bgColor: 'green',
    },
    {
      value: '24hrs',
      label: 'Setup Time',
      color: 'text-purple-400',
      bgColor: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center group">
          <div
            className={`backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 group-hover:scale-105 ${
              darkMode
                ? 'bg-white/5 border-white/10 group-hover:bg-white/10'
                : 'bg-black/5 border-black/10 group-hover:bg-black/10 group-hover:shadow-lg'
            }`}
          >
            {/* Animated Background */}
            <div
              className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                stat.bgColor === 'blue'
                  ? darkMode
                    ? 'bg-blue-500/10'
                    : 'bg-blue-100/50'
                  : stat.bgColor === 'green'
                    ? darkMode
                      ? 'bg-green-500/10'
                      : 'bg-green-100/50'
                    : darkMode
                      ? 'bg-purple-500/10'
                      : 'bg-purple-100/50'
              }`}
            ></div>

            <div className="relative z-10">
              <div
                className={`text-2xl font-bold mb-1 transition-colors duration-300 ${stat.color}`}
              >
                {stat.value}
              </div>
              <div
                className={`text-xs font-medium transition-colors duration-300 ${
                  darkMode
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-gray-600 group-hover:text-gray-500'
                }`}
              >
                {stat.label}
              </div>

              {/* Night Mode Star Decoration */}
              {darkMode && (
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid