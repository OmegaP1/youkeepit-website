// src/components/layout/Footer/sections/SocialSection.js
'use client'

import React from 'react'
import SocialIcon from '../components/SocialIcon'

const SocialSection = ({ darkMode }) => {
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/youkeepit',
      icon: 'twitter',
      color: darkMode
        ? 'hover:text-blue-400 hover:bg-blue-400/20'
        : 'hover:text-blue-500 hover:bg-blue-50',
      followers: '12K',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/youkeepit',
      icon: 'linkedin',
      color: darkMode
        ? 'hover:text-blue-600 hover:bg-blue-600/20'
        : 'hover:text-blue-700 hover:bg-blue-50',
      followers: '8K',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/youkeepit',
      icon: 'github',
      color: darkMode
        ? 'hover:text-gray-300 hover:bg-gray-300/20'
        : 'hover:text-gray-700 hover:bg-gray-100',
      followers: '2K',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@youkeepit',
      icon: 'youtube',
      color: darkMode
        ? 'hover:text-red-500 hover:bg-red-500/20'
        : 'hover:text-red-600 hover:bg-red-50',
      followers: '5K',
    },
  ];

  return (
    <div className="space-y-6">
      <h4
        className={`font-semibold text-lg flex items-center transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        <span className="mr-2">🌐</span>
        Follow Us
        {darkMode && (
          <span className="ml-2 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
            Live
          </span>
        )}
      </h4>

      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map(social => (
          <SocialIcon key={social.name} social={social} darkMode={darkMode} />
        ))}
      </div>

      {/* Social Proof */}
      <div
        className={`text-center pt-4 border-t transition-all duration-300 ${
          darkMode ? 'border-white/10' : 'border-gray-200'
        }`}
      >
        <p
          className={`text-xs transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Join{' '}
          <span
            className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-blue-300' : 'text-blue-600'
            }`}
          >
            27K+
          </span>{' '}
          followers
        </p>

        {/* Night Mode Animation */}
        {darkMode && (
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialSection