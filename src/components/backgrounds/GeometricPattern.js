// src/components/backgrounds/GeometricPattern.js
'use client'

import React from 'react'

const GeometricPattern = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
      ></div>

      {/* Geometric Grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          darkMode ? 'opacity-15' : 'opacity-10'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              polygon(0% 0%, 50% 50%, 0% 100%), 
              polygon(100% 0%, 50% 50%, 100% 100%)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
            backgroundRepeat: 'repeat',
            backgroundClip: 'border-box',
            opacity: darkMode ? 0.1 : 0.05,
          }}
        ></div>
      </div>

      {/* Floating Hexagons */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute transform transition-all duration-500 ${
              darkMode ? 'opacity-20' : 'opacity-30'
            }`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animation: `float-${i} ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div
              className={`w-16 h-16 transform rotate-45 transition-colors duration-500 ${
                i % 3 === 0
                  ? darkMode
                    ? 'bg-blue-500/20 border border-blue-400/30'
                    : 'bg-blue-200/40 border border-blue-300/50'
                  : i % 3 === 1
                  ? darkMode
                    ? 'bg-purple-500/20 border border-purple-400/30'
                    : 'bg-purple-200/40 border border-purple-300/50'
                  : darkMode
                  ? 'bg-green-500/20 border border-green-400/30'
                  : 'bg-green-200/40 border border-green-300/50'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Animated Triangles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`triangle-${i}`}
            className={`absolute transition-all duration-500 ${
              darkMode ? 'opacity-10' : 'opacity-20'
            }`}
            style={{
              right: `${5 + (i * 15)}%`,
              bottom: `${10 + (i * 12)}%`,
              animation: `spin-slow-${i} ${12 + i * 2}s linear infinite`,
            }}
          >
            <div
              className={`w-0 h-0 transition-all duration-500 ${
                i % 2 === 0
                  ? darkMode
                    ? 'border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyan-500/30'
                    : 'border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyan-400/40'
                  : darkMode
                  ? 'border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-pink-500/30'
                  : 'border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-pink-400/40'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Corner Geometric Accents */}
      <div
        className={`absolute top-0 left-0 w-32 h-32 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-blue-600/20 to-transparent'
            : 'bg-gradient-to-br from-blue-300/30 to-transparent'
        }`}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        }}
      ></div>

      <div
        className={`absolute top-0 right-0 w-32 h-32 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-bl from-purple-600/20 to-transparent'
            : 'bg-gradient-to-bl from-purple-300/30 to-transparent'
        }`}
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }}
      ></div>

      <div
        className={`absolute bottom-0 left-0 w-32 h-32 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-tr from-green-600/20 to-transparent'
            : 'bg-gradient-to-tr from-green-300/30 to-transparent'
        }`}
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
        }}
      ></div>

      <div
        className={`absolute bottom-0 right-0 w-32 h-32 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-tl from-orange-600/20 to-transparent'
            : 'bg-gradient-to-tl from-orange-300/30 to-transparent'
        }`}
        style={{
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
        }}
      ></div>

      {/* Dynamic Light Rays - Dark Mode Only */}
      {darkMode && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={`ray-${i}`}
              className="absolute opacity-5"
              style={{
                left: `${25 * i}%`,
                top: '0%',
                width: '2px',
                height: '100%',
                background: `linear-gradient(to bottom, transparent 0%, ${
                  ['cyan', 'blue', 'purple', 'pink'][i]
                }-400 50%, transparent 100%)`,
                animation: `ray-pulse-${i} ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-10px) rotate(50deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-15px) rotate(40deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-8px) rotate(55deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-12px) rotate(35deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-18px) rotate(60deg); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-6px) rotate(30deg); } }
        @keyframes float-6 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-14px) rotate(65deg); } }
        @keyframes float-7 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-20px) rotate(25deg); } }
        
        @keyframes spin-slow-0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-1 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spin-slow-2 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-3 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spin-slow-4 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-5 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        
        @keyframes ray-pulse-0 { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.15; } }
        @keyframes ray-pulse-1 { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.12; } }
        @keyframes ray-pulse-2 { 0%, 100% { opacity: 0.04; } 50% { opacity: 0.14; } }
        @keyframes ray-pulse-3 { 0%, 100% { opacity: 0.02; } 50% { opacity: 0.10; } }
      `}</style>
    </div>
  );
};

export default GeometricPattern;