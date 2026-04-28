// src/components/backgrounds/GeometricPattern.js
'use client';

import React from 'react';

const GeometricPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900"></div>

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => {
          const colorClass =
            i % 3 === 0
              ? 'bg-blue-200/40 border-blue-300/50 dark:bg-blue-500/20 dark:border-blue-400/30'
              : i % 3 === 1
                ? 'bg-purple-200/40 border-purple-300/50 dark:bg-purple-500/20 dark:border-purple-400/30'
                : 'bg-green-200/40 border-green-300/50 dark:bg-green-500/20 dark:border-green-400/30';
          return (
            <div
              key={`hex-${i}`}
              className="absolute transform opacity-30 dark:opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
                animation: `float-${i} ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div
                className={`w-16 h-16 transform rotate-45 transition-colors duration-500 border ${colorClass}`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-transparent dark:from-blue-600/20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-300/30 to-transparent dark:from-purple-600/20" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/30 to-transparent dark:from-green-600/20" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-300/30 to-transparent dark:from-orange-600/20" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }}></div>

      <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-10px) rotate(50deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-15px) rotate(40deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-8px) rotate(55deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-12px) rotate(35deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-18px) rotate(60deg); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-6px) rotate(30deg); } }
        @keyframes float-6 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-14px) rotate(65deg); } }
        @keyframes float-7 { 0%, 100% { transform: translateY(0px) rotate(45deg); } 50% { transform: translateY(-20px) rotate(25deg); } }
      `}</style>
    </div>
  );
};

export default GeometricPattern;
