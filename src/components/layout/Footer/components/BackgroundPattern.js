// src/components/layout/Footer/components/BackgroundPattern.js
'use client'

import React from 'react'

const BackgroundPattern = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-blue-900/50 via-gray-900/80 to-gray-900'
            : 'bg-gradient-to-br from-blue-100/50 via-gray-100/80 to-gray-200'
        }`}
      ></div>

      {/* Animated Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          darkMode ? 'opacity-10' : 'opacity-5'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px),
            linear-gradient(90deg, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div
        className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
          darkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
        }`}
      ></div>

      <div
        className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-lg animate-bounce transition-all duration-500 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
        }`}
        style={{ animationDuration: '3s' }}
      ></div>

      <div
        className={`absolute bottom-20 left-1/4 w-20 h-20 rounded-full blur-lg animate-ping transition-all duration-500 ${
          darkMode ? 'bg-green-500/10' : 'bg-green-400/20'
        }`}
        style={{ animationDuration: '4s' }}
      ></div>

      <div
        className={`absolute bottom-40 right-1/3 w-16 h-16 rounded-full blur-md animate-pulse transition-all duration-500 ${
          darkMode ? 'bg-yellow-500/10' : 'bg-yellow-400/20'
        }`}
        style={{ animationDuration: '2s' }}
      ></div>

      {/* Additional Night Mode Elements */}
      {darkMode && (
        <>
          {/* Starfield Effect */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Aurora Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '6s' }}
              ></div>
              <div
                className="absolute top-1/4 right-1/4 w-1/3 h-1/2 bg-gradient-to-b from-green-500/5 via-teal-500/5 to-transparent rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '8s', animationDelay: '2s' }}
              ></div>
            </div>
          </div>
        </>
      )}

      {/* Day Mode Elements */}
      {!darkMode && (
        <>
          {/* Sunbeam Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <div
              className="absolute inset-0 bg-gradient-conic from-yellow-200 via-orange-200 to-yellow-200 rounded-full blur-2xl animate-spin"
              style={{ animationDuration: '20s' }}
            ></div>
          </div>

          {/* Cloud Shapes */}
          <div className="absolute top-10 left-1/3 w-24 h-12 bg-white/20 rounded-full blur-sm"></div>
          <div className="absolute top-16 left-1/3 w-16 h-8 bg-white/20 rounded-full blur-sm translate-x-4"></div>
          <div className="absolute top-20 right-1/4 w-20 h-10 bg-white/20 rounded-full blur-sm"></div>
        </>
      )}

      {/* Corner Accents - Dynamic Colors */}
      <div
        className={`absolute top-0 left-0 w-40 h-40 rounded-br-full transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-blue-500/20 to-transparent'
            : 'bg-gradient-to-br from-blue-300/30 to-transparent'
        }`}
      ></div>

      <div
        className={`absolute top-0 right-0 w-40 h-40 rounded-bl-full transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-bl from-purple-500/20 to-transparent'
            : 'bg-gradient-to-bl from-purple-300/30 to-transparent'
        }`}
      ></div>

      <div
        className={`absolute bottom-0 left-0 w-40 h-40 rounded-tr-full transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-tr from-green-500/20 to-transparent'
            : 'bg-gradient-to-tr from-green-300/30 to-transparent'
        }`}
      ></div>

      <div
        className={`absolute bottom-0 right-0 w-40 h-40 rounded-tl-full transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-tl from-blue-500/20 to-transparent'
            : 'bg-gradient-to-tl from-blue-300/30 to-transparent'
        }`}
      ></div>
    </div>
  );
};

export default BackgroundPattern