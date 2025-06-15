// src/components/layout/Footer/components/LinkColumn.js
'use client'

import React from 'react'

const LinkColumn = ({ title, icon, links }) => {
  return (
    <div className="space-y-6">
      {/* Column Header */}
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <h4 className="text-white font-semibold text-lg">{title}</h4>
      </div>
      
      {/* Links List */}
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href} 
              className="group flex items-center justify-between text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
            >
              <span className="group-hover:text-blue-300">
                {link.label}
              </span>
              {link.badge && (
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  link.badge === 'New' ? 'bg-green-500/20 text-green-300' :
                  link.badge === 'SOC 2' ? 'bg-blue-500/20 text-blue-300' :
                  link.badge === 'Hiring' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-gray-500/20 text-gray-300'
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
    </div>
  )
}

export default LinkColumn