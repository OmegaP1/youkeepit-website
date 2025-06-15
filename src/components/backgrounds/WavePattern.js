// src/components/backgrounds/WavePattern.js
'use client'

import React from 'react'

const WavePattern = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900'
            : 'bg-gradient-to-b from-blue-50 via-white to-indigo-50'
        }`}
      ></div>

      {/* Animated Wave Layers */}
      <div className="absolute inset-0">
        {/* Wave 1 - Bottom */}
        <div
          className={`absolute bottom-0 left-0 w-full h-64 transition-all duration-500 ${
            darkMode ? 'opacity-20' : 'opacity-30'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(to top, rgba(59, 130, 246, 0.2), transparent)'
              : 'linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 80% 40%, 60% 50%, 40% 30%, 20% 40%, 0 20%)',
            animation: 'wave-1 8s ease-in-out infinite',
          }}
        ></div>

        {/* Wave 2 - Middle */}
        <div
          className={`absolute bottom-0 left-0 w-full h-48 transition-all duration-500 ${
            darkMode ? 'opacity-15' : 'opacity-25'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(to top, rgba(139, 92, 246, 0.2), transparent)'
              : 'linear-gradient(to top, rgba(139, 92, 246, 0.1), transparent)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 70%, 85% 50%, 65% 60%, 45% 40%, 25% 50%, 0 30%)',
            animation: 'wave-2 10s ease-in-out infinite reverse',
          }}
        ></div>

        {/* Wave 3 - Top */}
        <div
          className={`absolute bottom-0 left-0 w-full h-32 transition-all duration-500 ${
            darkMode ? 'opacity-25' : 'opacity-20'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(to top, rgba(16, 185, 129, 0.2), transparent)'
              : 'linear-gradient(to top, rgba(16, 185, 129, 0.1), transparent)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 80%, 75% 60%, 50% 70%, 25% 50%, 0 60%)',
            animation: 'wave-3 12s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* Top Wave Layers */}
      <div className="absolute inset-0">
        {/* Top Wave 1 */}
        <div
          className={`absolute top-0 left-0 w-full h-40 transition-all duration-500 ${
            darkMode ? 'opacity-10' : 'opacity-15'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(to bottom, rgba(244, 63, 94, 0.2), transparent)'
              : 'linear-gradient(to bottom, rgba(244, 63, 94, 0.1), transparent)',
            clipPath: 'polygon(0 0, 100% 0, 100% 40%, 80% 60%, 60% 50%, 40% 70%, 20% 60%, 0 80%)',
            animation: 'top-wave-1 9s ease-in-out infinite',
          }}
        ></div>

        {/* Top Wave 2 */}
        <div
          className={`absolute top-0 left-0 w-full h-24 transition-all duration-500 ${
            darkMode ? 'opacity-15' : 'opacity-20'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(to bottom, rgba(236, 72, 153, 0.2), transparent)'
              : 'linear-gradient(to bottom, rgba(236, 72, 153, 0.1), transparent)',
            clipPath: 'polygon(0 0, 100% 0, 100% 20%, 75% 40%, 50% 30%, 25% 50%, 0 40%)',
            animation: 'top-wave-2 11s ease-in-out infinite reverse',
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
              darkMode
                ? i % 4 === 0
                  ? 'bg-blue-400/30'
                  : i % 4 === 1
                  ? 'bg-purple-400/30'
                  : i % 4 === 2
                  ? 'bg-green-400/30'
                  : 'bg-pink-400/30'
                : i % 4 === 0
                ? 'bg-blue-300/40'
                : i % 4 === 1
                ? 'bg-purple-300/40'
                : i % 4 === 2
                ? 'bg-green-300/40'
                : 'bg-pink-300/40'
            }`}
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 6)}%`,
              animation: `float-particle-${i % 4} ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Ripple Effects */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`ripple-${i}`}
            className={`absolute rounded-full border transition-all duration-500 ${
              darkMode
                ? 'border-cyan-400/20'
                : 'border-cyan-300/30'
            }`}
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${30 + (i * 20)}%`,
              width: `${60 + (i * 40)}px`,
              height: `${60 + (i * 40)}px`,
              animation: `ripple-${i} ${6 + i * 2}s ease-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Gradient Orbs - Dark Mode Enhancement */}
      {darkMode && (
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse"
            style={{ animationDuration: '4s' }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-lg animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-radial from-green-500/10 to-transparent rounded-full blur-md animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          ></div>
        </div>
      )}

      {/* Light Mode Subtle Elements */}
      {!darkMode && (
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-radial from-yellow-200/40 to-transparent rounded-full blur-lg animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-radial from-orange-200/40 to-transparent rounded-full blur-md animate-pulse"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes wave-1 {
          0%, 100% { clip-path: polygon(0 100%, 100% 100%, 100% 60%, 80% 40%, 60% 50%, 40% 30%, 20% 40%, 0 20%); }
          50% { clip-path: polygon(0 100%, 100% 100%, 100% 70%, 85% 50%, 65% 60%, 45% 40%, 25% 50%, 0 30%); }
        }
        
        @keyframes wave-2 {
          0%, 100% { clip-path: polygon(0 100%, 100% 100%, 100% 70%, 85% 50%, 65% 60%, 45% 40%, 25% 50%, 0 30%); }
          50% { clip-path: polygon(0 100%, 100% 100%, 100% 50%, 75% 70%, 55% 40%, 35% 60%, 15% 30%, 0 50%); }
        }
        
        @keyframes wave-3 {
          0%, 100% { clip-path: polygon(0 100%, 100% 100%, 100% 80%, 75% 60%, 50% 70%, 25% 50%, 0 60%); }
          50% { clip-path: polygon(0 100%, 100% 100%, 100% 60%, 70% 80%, 45% 50%, 20% 70%, 0 40%); }
        }
        
        @keyframes top-wave-1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 40%, 80% 60%, 60% 50%, 40% 70%, 20% 60%, 0 80%); }
          50% { clip-path: polygon(0 0, 100% 0, 100% 60%, 85% 40%, 65% 70%, 45% 50%, 25% 80%, 0 60%); }
        }
        
        @keyframes top-wave-2 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 20%, 75% 40%, 50% 30%, 25% 50%, 0 40%); }
          50% { clip-path: polygon(0 0, 100% 0, 100% 40%, 80% 20%, 55% 50%, 30% 30%, 0 60%); }
        }
        
        @keyframes float-particle-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          25% { transform: translateY(-15px) translateX(5px); opacity: 1; }
          50% { transform: translateY(-8px) translateX(-3px); opacity: 0.8; }
          75% { transform: translateY(-20px) translateX(8px); opacity: 0.9; }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          33% { transform: translateY(-12px) translateX(-5px); opacity: 0.9; }
          66% { transform: translateY(-18px) translateX(7px); opacity: 1; }
        }
        
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
          50% { transform: translateY(-25px) translateX(-10px); opacity: 0.6; }
        }
        
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          40% { transform: translateY(-10px) translateX(12px); opacity: 1; }
          80% { transform: translateY(-16px) translateX(-8px); opacity: 0.7; }
        }
        
        @keyframes ripple-0 {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        
        @keyframes ripple-1 {
          0% { transform: scale(0.6); opacity: 0.6; }
          50% { transform: scale(1.0); opacity: 0.3; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        
        @keyframes ripple-2 {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default WavePattern;