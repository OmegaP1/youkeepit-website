// src/components/layout/Footer/components/BackgroundPattern.js
'use client'

import React from 'react'

const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900/80 to-gray-900"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-lg animate-ping" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-yellow-500/10 rounded-full blur-md animate-pulse" style={{ animationDuration: '2s' }}></div>
      
   
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-500/20 to-transparent rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-tl-full"></div>
    </div>
  )
}

export default BackgroundPattern