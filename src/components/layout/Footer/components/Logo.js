// src/components/layout/Footer/components/Logo.js
'use client'

import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      {/* Animated Logo */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
          <span className="text-white font-bold text-xl">Y</span>
          {/* Floating particles */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-80 animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
        </div>
      </div>
      
      {/* Company Name */}
      <div>
        <span className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
          YouKeepIt
        </span>
        <div className="text-xs text-blue-300 font-medium tracking-wide">
          IT Equipment Solutions
        </div>
      </div>
    </div>
  )
}

export default Logo