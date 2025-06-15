// src/components/backgrounds/CodeMatrix.js
'use client'

import React from 'react'

const CodeMatrix = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Tech Gradient */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-800 via-indigo-900/20 to-gray-800'
            : 'bg-gradient-to-br from-white via-indigo-50/30 to-gray-50'
        }`}
      ></div>

      {/* Falling Code Streams */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`code-stream-${i}`}
            className={`absolute opacity-20 font-mono text-xs transition-all duration-500 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}
            style={{
              left: `${(i * 8.5) % 100}%`,
              top: '-20%',
              width: '20px',
              height: '120%',
              animation: `code-fall-${i % 3} ${4 + (i % 3)}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {['?', '{', '}', '0', '1', 'if', 'Q:', 'A:', '[]', '()', '...', '&&', '||', '!=', '==', 'FAQ'].map((char, j) => (
              <div
                key={j}
                className="mb-4"
                style={{
                  opacity: Math.random() * 0.8 + 0.2,
                  animationDelay: `${j * 0.1}s`,
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Question Mark Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`question-${i}`}
            className={`absolute font-bold transition-all duration-500 ${
              darkMode
                ? i % 3 === 0
                  ? 'text-blue-400/30'
                  : i % 3 === 1
                  ? 'text-purple-400/30'
                  : 'text-cyan-400/30'
                : i % 3 === 0
                ? 'text-blue-300/40'
                : i % 3 === 1
                ? 'text-purple-300/40'
                : 'text-cyan-300/40'
            }`}
            style={{
              left: `${(i * 7) % 95}%`,
              top: `${(i * 11) % 90}%`,
              fontSize: `${16 + (i % 3) * 8}px`,
              animation: `question-float-${i % 4} ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ?
          </div>
        ))}
      </div>

      {/* Floating Code Blocks */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`code-block-${i}`}
            className={`absolute font-mono text-xs p-2 rounded border transition-all duration-500 ${
              darkMode
                ? 'bg-gray-700/20 border-gray-600/30 text-gray-400/60'
                : 'bg-white/40 border-gray-300/30 text-gray-600/60'
            }`}
            style={{
              left: `${5 + (i * 12)}%`,
              top: `${10 + (i * 8)}%`,
              animation: `code-block-drift-${i % 3} ${8 + (i % 2)}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {i % 4 === 0 ? 'if (question)' :
             i % 4 === 1 ? '{ answer }' :
             i % 4 === 2 ? 'FAQ.map()' :
             'return help;'}
          </div>
        ))}
      </div>

      {/* Data Flow Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          {[...Array(8)].map((_, i) => (
            <g key={`data-flow-${i}`}>
              <path
                d={`M${i * 50} 0 Q${i * 50 + 25} 50 ${i * 50 + 50} 100 T${i * 50 + 100} 200`}
                fill="none"
                stroke={darkMode ? '#3b82f6' : '#6366f1'}
                strokeWidth="1"
                strokeDasharray="5,5"
                className="animate-pulse"
                style={{
                  animationDuration: `${3 + (i % 2)}s`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              {/* Data Points */}
              <circle
                cx={i * 50 + 25}
                cy={50 + (i * 15)}
                r="2"
                fill={darkMode ? '#60a5fa' : '#8b5cf6'}
                className="animate-pulse"
                style={{
                  animationDuration: `${2 + (i % 3)}s`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Accordion-like Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`accordion-${i}`}
            className={`absolute transition-all duration-500 ${
              darkMode
                ? 'border-l-4 border-blue-500/20'
                : 'border-l-4 border-blue-400/30'
            }`}
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 8)}%`,
              width: '60px',
              height: '20px',
              animation: `accordion-expand-${i % 3} ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            <div
              className={`w-full h-1 transition-all duration-500 ${
                darkMode ? 'bg-blue-400/20' : 'bg-blue-300/30'
              }`}
            ></div>
            <div
              className={`w-3/4 h-1 mt-1 transition-all duration-500 ${
                darkMode ? 'bg-gray-500/20' : 'bg-gray-400/30'
              }`}
            ></div>
            <div
              className={`w-1/2 h-1 mt-1 transition-all duration-500 ${
                darkMode ? 'bg-gray-500/20' : 'bg-gray-400/30'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Search/Filter Icons */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`search-icon-${i}`}
            className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-500 ${
              darkMode
                ? 'border-cyan-400/30 bg-cyan-500/10'
                : 'border-cyan-300/40 bg-cyan-200/20'
            }`}
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${25 + (i * 15)}%`,
              animation: `search-pulse-${i % 2} ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border transition-all duration-500 ${
                darkMode ? 'border-cyan-400/50' : 'border-cyan-500/60'
              }`}
            ></div>
            <div
              className={`absolute bottom-1 right-1 w-2 h-1 transform rotate-45 transition-all duration-500 ${
                darkMode ? 'bg-cyan-400/50' : 'bg-cyan-500/60'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Binary Rain - Dark Mode Only */}
      {darkMode && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`binary-${i}`}
              className="absolute opacity-5 font-mono text-xs text-green-400"
              style={{
                left: `${5 + (i * 15)}%`,
                top: '-10%',
                width: '20px',
                height: '110%',
                animation: `binary-rain ${3 + (i % 2)}s linear infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            >
              {Array.from({ length: 30 }, (_, j) => (
                <div key={j} className="mb-2">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Light Mode Knowledge Symbols */}
      {!darkMode && (
        <div className="absolute inset-0">
          {['💡', '📖', '💬', '🔍', '📋'].map((symbol, i) => (
            <div
              key={`symbol-${i}`}
              className="absolute text-2xl opacity-10"
              style={{
                left: `${10 + (i * 20)}%`,
                top: `${30 + (i * 8)}%`,
                animation: `symbol-float ${4 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes code-fall-0 {
          0% { transform: translateY(-120%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        
        @keyframes code-fall-1 {
          0% { transform: translateY(-120%); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        
        @keyframes code-fall-2 {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        
        @keyframes question-float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-10px) rotate(5deg); opacity: 0.6; }
          50% { transform: translateY(-5px) rotate(-3deg); opacity: 0.4; }
          75% { transform: translateY(-15px) rotate(8deg); opacity: 0.7; }
        }
        
        @keyframes question-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-8px) rotate(-5deg); opacity: 0.7; }
          66% { transform: translateY(-12px) rotate(7deg); opacity: 0.5; }
        }
        
        @keyframes question-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(-10deg); opacity: 0.6; }
        }
        
        @keyframes question-float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          40% { transform: translateY(-6px) rotate(4deg); opacity: 0.3; }
          80% { transform: translateY(-14px) rotate(-6deg); opacity: 0.8; }
        }
        
        @keyframes code-block-drift-0 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translate(10px, -15px) rotate(2deg); opacity: 0.3; }
        }
        
        @keyframes code-block-drift-1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(-8px, -10px) rotate(-2deg); opacity: 0.7; }
        }
        
        @keyframes code-block-drift-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translate(12px, -20px) rotate(3deg); opacity: 0.2; }
        }
        
        @keyframes accordion-expand-0 {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          50% { transform: scaleX(1.2); opacity: 0.6; }
        }
        
        @keyframes accordion-expand-1 {
          0%, 100% { transform: scaleX(1); opacity: 0.4; }
          50% { transform: scaleX(0.8); opacity: 0.7; }
        }
        
        @keyframes accordion-expand-2 {
          0%, 100% { transform: scaleX(1); opacity: 0.2; }
          50% { transform: scaleX(1.4); opacity: 0.5; }
        }
        
        @keyframes search-pulse-0 {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        
        @keyframes search-pulse-1 {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(0.8); opacity: 0.7; }
        }
        
        @keyframes binary-rain {
          0% { transform: translateY(-110%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        
        @keyframes symbol-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-15px) rotate(5deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default CodeMatrix;