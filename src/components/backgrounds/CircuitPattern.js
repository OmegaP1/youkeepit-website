// src/components/backgrounds/CircuitPattern.js
'use client'

import React from 'react'

const CircuitPattern = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Tech Gradient */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100'
        }`}
      ></div>

      {/* Circuit Board Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          darkMode ? 'opacity-20' : 'opacity-15'
        }`}
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {/* Horizontal Circuit Lines */}
          {[...Array(10)].map((_, i) => (
            <g key={`h-circuit-${i}`}>
              <line
                x1="0"
                y1={40 * i}
                x2="400"
                y2={40 * i}
                stroke={darkMode ? '#3b82f6' : '#6366f1'}
                strokeWidth="1"
                opacity="0.4"
                className="animate-pulse"
                style={{
                  animationDuration: `${3 + (i % 3)}s`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
              {/* Connection Points */}
              {[...Array(8)].map((_, j) => (
                <circle
                  key={`h-point-${i}-${j}`}
                  cx={50 * j + 25}
                  cy={40 * i}
                  r="2"
                  fill={darkMode ? '#60a5fa' : '#8b5cf6'}
                  opacity="0.6"
                  className="animate-pulse"
                  style={{
                    animationDuration: `${2 + (j % 2)}s`,
                    animationDelay: `${(i + j) * 0.2}s`,
                  }}
                />
              ))}
            </g>
          ))}

          {/* Vertical Circuit Lines */}
          {[...Array(8)].map((_, i) => (
            <g key={`v-circuit-${i}`}>
              <line
                x1={50 * i + 25}
                y1="0"
                x2={50 * i + 25}
                y2="400"
                stroke={darkMode ? '#8b5cf6' : '#3b82f6'}
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{
                  animationDuration: `${4 + (i % 2)}s`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
              {/* Connection Points */}
              {[...Array(10)].map((_, j) => (
                <circle
                  key={`v-point-${i}-${j}`}
                  cx={50 * i + 25}
                  cy={40 * j}
                  r="1.5"
                  fill={darkMode ? '#a78bfa' : '#6366f1'}
                  opacity="0.5"
                  className="animate-pulse"
                  style={{
                    animationDuration: `${2.5 + (j % 3)}s`,
                    animationDelay: `${(i + j) * 0.15}s`,
                  }}
                />
              ))}
            </g>
          ))}

          {/* Circuit Nodes */}
          {[...Array(6)].map((_, i) => (
            <g key={`node-${i}`}>
              <rect
                x={60 + (i * 50)}
                y={80 + (i * 30)}
                width="20"
                height="15"
                fill="none"
                stroke={darkMode ? '#10b981' : '#059669'}
                strokeWidth="2"
                opacity="0.7"
                className="animate-pulse"
                style={{
                  animationDuration: `${3 + (i % 2)}s`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              <circle
                cx={70 + (i * 50)}
                cy={87.5 + (i * 30)}
                r="3"
                fill={darkMode ? '#34d399' : '#10b981'}
                opacity="0.8"
                className="animate-pulse"
                style={{
                  animationDuration: `${2 + (i % 3)}s`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            </g>
          ))}

          {/* Data Flow Paths */}
          {[...Array(4)].map((_, i) => (
            <path
              key={`flow-${i}`}
              d={`M${50 + i * 80} 50 Q${100 + i * 80} 100 ${150 + i * 80} 150 T${250 + i * 80} 250`}
              fill="none"
              stroke={darkMode ? '#f59e0b' : '#d97706'}
              strokeWidth="2"
              opacity="0.6"
              strokeDasharray="10,5"
              className="animate-pulse"
              style={{
                animationDuration: `${5 + i}s`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Circuit Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`circuit-element-${i}`}
            className={`absolute transition-all duration-500 ${
              darkMode
                ? 'border border-blue-400/30 bg-blue-500/10'
                : 'border border-blue-300/40 bg-blue-200/20'
            }`}
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              left: `${(i * 8.5) % 95}%`,
              top: `${(i * 11) % 90}%`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
              animation: `circuit-float-${i % 4} ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Energy Pulses */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`energy-pulse-${i}`}
            className={`absolute rounded-full transition-all duration-500 ${
              darkMode
                ? 'bg-gradient-radial from-cyan-400/20 to-transparent'
                : 'bg-gradient-radial from-cyan-300/30 to-transparent'
            }`}
            style={{
              width: `${60 + (i * 20)}px`,
              height: `${60 + (i * 20)}px`,
              left: `${10 + (i * 15)}%`,
              top: `${15 + (i * 12)}%`,
              animation: `energy-pulse-${i % 3} ${4 + i}s ease-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Tech Grid Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          darkMode ? 'opacity-5' : 'opacity-8'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            animation: 'grid-move 10s linear infinite',
          }}
        ></div>
      </div>

      {/* Digital Rain Effect - Dark Mode Only */}
      {darkMode && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`digital-rain-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${10 + (i * 12)}%`,
                top: '-10%',
                width: '2px',
                height: '120%',
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  #10b981 20%, 
                  #34d399 50%, 
                  #6ee7b7 80%, 
                  transparent 100%)`,
                animation: `digital-rain-${i % 3} ${3 + (i % 2)}s linear infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Holographic Elements - Dark Mode Enhancement */}
      {darkMode && (
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-400/20 rounded-lg"
            style={{
              animation: 'hologram-1 8s ease-in-out infinite',
              background: 'linear-gradient(45deg, transparent 30%, rgba(34, 211, 238, 0.1) 50%, transparent 70%)',
            }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-purple-400/20 rounded-full"
            style={{
              animation: 'hologram-2 6s ease-in-out infinite reverse',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 30%, transparent 70%)',
            }}
          ></div>
        </div>
      )}

      {/* Light Mode Tech Accents */}
      {!darkMode && (
        <div className="absolute inset-0">
          <div className="absolute top-16 right-16 w-20 h-20 border border-gray-300/50 rounded-lg bg-gradient-to-br from-blue-100/30 to-transparent"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 border border-gray-300/50 rounded-full bg-gradient-to-br from-purple-100/30 to-transparent"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes circuit-float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          25% { transform: translateY(-10px) rotate(90deg); opacity: 1; }
          50% { transform: translateY(-5px) rotate(180deg); opacity: 0.8; }
          75% { transform: translateY(-15px) rotate(270deg); opacity: 0.9; }
        }
        
        @keyframes circuit-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-8px) rotate(-120deg); opacity: 0.9; }
          66% { transform: translateY(-12px) rotate(-240deg); opacity: 1; }
        }
        
        @keyframes circuit-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        
        @keyframes circuit-float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          40% { transform: translateY(-6px) rotate(144deg); opacity: 1; }
          80% { transform: translateY(-14px) rotate(288deg); opacity: 0.7; }
        }
        
        @keyframes energy-pulse-0 {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        
        @keyframes energy-pulse-1 {
          0% { transform: scale(0.6); opacity: 0.6; }
          50% { transform: scale(1.0); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        
        @keyframes energy-pulse-2 {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 30px 30px; }
        }
        
        @keyframes digital-rain-0 {
          0% { transform: translateY(-120%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        
        @keyframes digital-rain-1 {
          0% { transform: translateY(-120%); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        
        @keyframes digital-rain-2 {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        
        @keyframes hologram-1 {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); opacity: 0.6; }
          25% { transform: rotateY(90deg) rotateX(10deg); opacity: 0.8; }
          50% { transform: rotateY(180deg) rotateX(0deg); opacity: 0.4; }
          75% { transform: rotateY(270deg) rotateX(-10deg); opacity: 0.7; }
        }
        
        @keyframes hologram-2 {
          0%, 100% { transform: rotateZ(0deg) scale(1); opacity: 0.5; }
          50% { transform: rotateZ(180deg) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default CircuitPattern;