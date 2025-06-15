// src/components/backgrounds/GradientMesh.js
'use client'

import React from 'react'

const GradientMesh = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-900 via-indigo-900/30 to-gray-900'
            : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50'
        }`}
      ></div>

      {/* Primary Gradient Mesh */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode ? 'opacity-40' : 'opacity-60'
        }`}
      >
        {/* Top Left Mesh */}
        <div
          className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
            darkMode
              ? 'bg-gradient-conic from-blue-500/30 via-purple-500/20 to-cyan-500/30'
              : 'bg-gradient-conic from-blue-300/40 via-purple-300/30 to-cyan-300/40'
          }`}
          style={{
            animation: 'mesh-rotate-1 20s linear infinite',
          }}
        ></div>

        {/* Top Right Mesh */}
        <div
          className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
            darkMode
              ? 'bg-gradient-conic from-pink-500/30 via-orange-500/20 to-red-500/30'
              : 'bg-gradient-conic from-pink-300/40 via-orange-300/30 to-red-300/40'
          }`}
          style={{
            animation: 'mesh-rotate-2 25s linear infinite reverse',
          }}
        ></div>

        {/* Bottom Left Mesh */}
        <div
          className={`absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl transition-all duration-500 ${
            darkMode
              ? 'bg-gradient-conic from-green-500/30 via-teal-500/20 to-emerald-500/30'
              : 'bg-gradient-conic from-green-300/40 via-teal-300/30 to-emerald-300/40'
          }`}
          style={{
            animation: 'mesh-rotate-3 30s linear infinite',
          }}
        ></div>

        {/* Bottom Right Mesh */}
        <div
          className={`absolute bottom-0 right-0 w-88 h-88 rounded-full blur-3xl transition-all duration-500 ${
            darkMode
              ? 'bg-gradient-conic from-violet-500/30 via-indigo-500/20 to-blue-500/30'
              : 'bg-gradient-conic from-violet-300/40 via-indigo-300/30 to-blue-300/40'
          }`}
          style={{
            animation: 'mesh-rotate-4 18s linear infinite reverse',
          }}
        ></div>

        {/* Center Mesh */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-gradient-conic from-yellow-500/20 via-amber-500/10 to-orange-500/20'
              : 'bg-gradient-conic from-yellow-200/30 via-amber-200/20 to-orange-200/30'
          }`}
          style={{
            animation: 'mesh-pulse-center 15s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* Secondary Mesh Layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode ? 'opacity-20' : 'opacity-30'
        }`}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`secondary-mesh-${i}`}
            className={`absolute rounded-full blur-2xl transition-all duration-500 ${
              darkMode
                ? i % 4 === 0
                  ? 'bg-gradient-radial from-blue-400/40 to-transparent'
                  : i % 4 === 1
                  ? 'bg-gradient-radial from-purple-400/40 to-transparent'
                  : i % 4 === 2
                  ? 'bg-gradient-radial from-green-400/40 to-transparent'
                  : 'bg-gradient-radial from-pink-400/40 to-transparent'
                : i % 4 === 0
                ? 'bg-gradient-radial from-blue-200/50 to-transparent'
                : i % 4 === 1
                ? 'bg-gradient-radial from-purple-200/50 to-transparent'
                : i % 4 === 2
                ? 'bg-gradient-radial from-green-200/50 to-transparent'
                : 'bg-gradient-radial from-pink-200/50 to-transparent'
            }`}
            style={{
              width: `${120 + (i * 15)}px`,
              height: `${120 + (i * 15)}px`,
              left: `${(i * 13) % 90}%`,
              top: `${(i * 17) % 90}%`,
              animation: `secondary-mesh-${i % 4} ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mesh Grid Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          darkMode ? 'opacity-5' : 'opacity-8'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${
                darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'
              } 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, ${
                darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'
              } 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, ${
                darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'
              } 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, ${
                darkMode ? 'rgba(244, 63, 94, 0.1)' : 'rgba(244, 63, 94, 0.05)'
              } 0%, transparent 50%)
            `,
            backgroundSize: '200px 200px',
            animation: 'grid-shift 25s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`gradient-orb-${i}`}
            className={`absolute rounded-full transition-all duration-500 ${
              darkMode
                ? 'bg-gradient-radial from-white/10 to-transparent'
                : 'bg-gradient-radial from-gray-300/20 to-transparent'
            }`}
            style={{
              width: `${40 + (i * 10)}px`,
              height: `${40 + (i * 10)}px`,
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i * 10)}%`,
              animation: `gradient-orb-float-${i % 3} ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
              filter: 'blur(8px)',
            }}
          ></div>
        ))}
      </div>

      {/* Animated Gradient Streaks - Dark Mode Only */}
      {darkMode && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`gradient-streak-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${i * 20}%`,
                top: '0%',
                width: '2px',
                height: '100%',
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  ${['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i]} 30%, 
                  ${['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i]} 70%, 
                  transparent 100%)`,
                animation: `streak-${i} ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Light Mode Subtle Accents */}
      {!darkMode && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-radial from-yellow-200/30 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-radial from-orange-200/30 to-transparent rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      <style jsx>{`
        @keyframes mesh-rotate-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes mesh-rotate-2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes mesh-rotate-3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes mesh-rotate-4 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes mesh-pulse-center {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.1; }
        }
        
        @keyframes secondary-mesh-0 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.1; }
        }
        
        @keyframes secondary-mesh-1 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scale(0.8) rotate(-180deg); opacity: 0.6; }
        }
        
        @keyframes secondary-mesh-2 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.1) rotate(90deg); opacity: 0.2; }
        }
        
        @keyframes secondary-mesh-3 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.4) rotate(-90deg); opacity: 0.4; }
        }
        
        @keyframes grid-shift {
          0%, 100% { background-position: 0 0; }
          25% { background-position: 20px 20px; }
          50% { background-position: 40px 0; }
          75% { background-position: 20px -20px; }
        }
        
        @keyframes gradient-orb-float-0 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.3; }
        }
        
        @keyframes gradient-orb-float-1 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(30px) scale(0.9); opacity: 0.7; }
        }
        
        @keyframes gradient-orb-float-2 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 0.2; }
        }
        
        @keyframes streak-0 {
          0%, 100% { opacity: 0.1; transform: translateY(0px); }
          50% { opacity: 0.3; transform: translateY(-10px); }
        }
        
        @keyframes streak-1 {
          0%, 100% { opacity: 0.05; transform: translateY(0px); }
          50% { opacity: 0.25; transform: translateY(15px); }
        }
        
        @keyframes streak-2 {
          0%, 100% { opacity: 0.08; transform: translateY(0px); }
          50% { opacity: 0.2; transform: translateY(-8px); }
        }
        
        @keyframes streak-3 {
          0%, 100% { opacity: 0.12; transform: translateY(0px); }
          50% { opacity: 0.28; transform: translateY(12px); }
        }
        
        @keyframes streak-4 {
          0%, 100% { opacity: 0.06; transform: translateY(0px); }
          50% { opacity: 0.22; transform: translateY(-18px); }
        }
      `}</style>
    </div>
  );
};

export default GradientMesh;