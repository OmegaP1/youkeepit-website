// src/components/backgrounds/ParticleField.js
'use client'

import React from 'react'

const ParticleField = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-tr from-gray-900 via-purple-900/20 to-gray-900'
            : 'bg-gradient-to-tr from-gray-50 via-blue-50 to-purple-50'
        }`}
      ></div>

      {/* Main Particle Field */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <div
            key={`main-particle-${i}`}
            className={`absolute rounded-full transition-all duration-500 ${
              darkMode
                ? i % 5 === 0
                  ? 'bg-blue-400/40 shadow-lg shadow-blue-400/20'
                  : i % 5 === 1
                  ? 'bg-purple-400/40 shadow-lg shadow-purple-400/20'
                  : i % 5 === 2
                  ? 'bg-green-400/40 shadow-lg shadow-green-400/20'
                  : i % 5 === 3
                  ? 'bg-pink-400/40 shadow-lg shadow-pink-400/20'
                  : 'bg-cyan-400/40 shadow-lg shadow-cyan-400/20'
                : i % 5 === 0
                ? 'bg-blue-300/30 shadow-md shadow-blue-300/10'
                : i % 5 === 1
                ? 'bg-purple-300/30 shadow-md shadow-purple-300/10'
                : i % 5 === 2
                ? 'bg-green-300/30 shadow-md shadow-green-300/10'
                : i % 5 === 3
                ? 'bg-pink-300/30 shadow-md shadow-pink-300/10'
                : 'bg-cyan-300/30 shadow-md shadow-cyan-300/10'
            }`}
            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float-${i % 6} ${8 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3)}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Connecting Lines - Dark Mode Only */}
      {darkMode && (
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10">
            {[...Array(15)].map((_, i) => (
              <line
                key={`connection-${i}`}
                x1={`${(i * 7) % 100}%`}
                y1={`${(i * 11) % 100}%`}
                x2={`${((i + 1) * 7) % 100}%`}
                y2={`${((i + 1) * 11) % 100}%`}
                stroke={
                  i % 4 === 0
                    ? '#60a5fa'
                    : i % 4 === 1
                    ? '#a78bfa'
                    : i % 4 === 2
                    ? '#34d399'
                    : '#f472b6'
                }
                strokeWidth="1"
                className="animate-pulse"
                style={{
                  animationDuration: `${3 + (i % 3)}s`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Large Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className={`absolute rounded-full blur-lg transition-all duration-500 ${
              darkMode
                ? i % 3 === 0
                  ? 'bg-gradient-radial from-blue-500/20 to-transparent'
                  : i % 3 === 1
                  ? 'bg-gradient-radial from-purple-500/20 to-transparent'
                  : 'bg-gradient-radial from-green-500/20 to-transparent'
                : i % 3 === 0
                ? 'bg-gradient-radial from-blue-300/25 to-transparent'
                : i % 3 === 1
                ? 'bg-gradient-radial from-purple-300/25 to-transparent'
                : 'bg-gradient-radial from-green-300/25 to-transparent'
            }`}
            style={{
              width: `${80 + (i * 20)}px`,
              height: `${80 + (i * 20)}px`,
              left: `${15 + (i * 15)}%`,
              top: `${10 + (i * 15)}%`,
              animation: `orb-float-${i % 3} ${12 + (i * 2)}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Micro Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`micro-particle-${i}`}
            className={`absolute w-1 h-1 rounded-full transition-all duration-500 ${
              darkMode
                ? 'bg-white/30'
                : 'bg-gray-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `micro-float ${6 + (i % 4)}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Energy Pulses - Dark Mode Enhancement */}
      {darkMode && (
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`pulse-${i}`}
              className="absolute rounded-full border opacity-20"
              style={{
                left: `${25 * i}%`,
                top: `${25 * i}%`,
                width: '150px',
                height: '150px',
                borderColor: ['#60a5fa', '#a78bfa', '#34d399', '#f472b6'][i],
                animation: `energy-pulse-${i} ${6 + i}s ease-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Sparkle Effects - Light Mode */}
      {!darkMode && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${15 + (i * 10)}%`,
                animation: `sparkle-${i % 4} ${3 + (i % 2)}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes particle-float-0 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.7; }
          25% { transform: translate(15px, -20px) scale(1.1); opacity: 1; }
          50% { transform: translate(-10px, -35px) scale(0.9); opacity: 0.8; }
          75% { transform: translate(20px, -15px) scale(1.05); opacity: 0.9; }
        }
        
        @keyframes particle-float-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
          33% { transform: translate(-18px, -25px) scale(1.2); opacity: 0.9; }
          66% { transform: translate(12px, -40px) scale(0.8); opacity: 1; }
        }
        
        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.8; }
          50% { transform: translate(-25px, -30px) scale(1.15); opacity: 0.5; }
        }
        
        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.7; }
          40% { transform: translate(22px, -18px) scale(0.9); opacity: 1; }
          80% { transform: translate(-15px, -32px) scale(1.1); opacity: 0.6; }
        }
        
        @keyframes particle-float-4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.5; }
          60% { transform: translate(8px, -45px) scale(1.3); opacity: 0.9; }
        }
        
        @keyframes particle-float-5 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
          30% { transform: translate(-20px, -12px) scale(0.7); opacity: 0.7; }
          70% { transform: translate(16px, -28px) scale(1.2); opacity: 1; }
        }
        
        @keyframes orb-float-0 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.3; }
        }
        
        @keyframes orb-float-1 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(40px) scale(0.9); opacity: 0.8; }
        }
        
        @keyframes orb-float-2 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.4; }
        }
        
        @keyframes micro-float {
          0% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        
        @keyframes energy-pulse-0 {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        
        @keyframes energy-pulse-1 {
          0% { transform: scale(0.6); opacity: 0.4; }
          50% { transform: scale(1.0); opacity: 0.2; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        
        @keyframes energy-pulse-2 {
          0% { transform: scale(0.9); opacity: 0.2; }
          50% { transform: scale(1.3); opacity: 0.15; }
          100% { transform: scale(2.0); opacity: 0; }
        }
        
        @keyframes energy-pulse-3 {
          0% { transform: scale(0.7); opacity: 0.35; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        
        @keyframes sparkle-0 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        
        @keyframes sparkle-1 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(-180deg); opacity: 0.8; }
        }
        
        @keyframes sparkle-2 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(0.8) rotate(90deg); opacity: 1; }
        }
        
        @keyframes sparkle-3 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(-90deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ParticleField;