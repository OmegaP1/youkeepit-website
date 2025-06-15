// src/components/layout/Footer/components/LinkColumn.js
'use client'

import React from 'react'

const LinkColumn = ({ title, icon, links, darkMode }) => {
  return (
    <div className="space-y-6">
      {/* Column Header */}
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <h4 className={`font-semibold text-lg transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>{title}</h4>
      </div>
      
      {/* Links List */}
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href} 
              className={`group flex items-center justify-between transition-all duration-300 hover:translate-x-1 ${
                darkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className={`transition-colors duration-300 ${
                darkMode ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'
              }`}>
                {link.label}
              </span>
              
              {link.badge && (
                <span className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                  link.badge === 'New' 
                    ? darkMode 
                      ? 'bg-green-500/20 text-green-300 group-hover:bg-green-500/30' 
                      : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                    : link.badge === 'SOC 2' 
                      ? darkMode 
                        ? 'bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/30' 
                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                      : link.badge === 'Hiring' 
                        ? darkMode 
                          ? 'bg-purple-500/20 text-purple-300 group-hover:bg-purple-500/30' 
                          : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                        : darkMode 
                          ? 'bg-gray-500/20 text-gray-300 group-hover:bg-gray-500/30' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  {link.badge}
                </span>
              )}
              
              {/* Hover arrow */}
              <svg 
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
      
      {/* Night Mode Glow Effect */}
      {darkMode && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
      )}
    </div>
  )
}

export default LinkColumn