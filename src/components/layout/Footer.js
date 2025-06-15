// src/components/layout/Footer.js
'use client';

import React from 'react';
import CompanySection from './Footer/sections/CompanySection';
import LinkColumns from './Footer/sections/LinkColumns';
import SocialSection from './Footer/sections/SocialSection';
import NewsletterSection from './Footer/sections/NewsletterSection';
import BottomBar from './Footer/sections/BottomBar';
import BackgroundPattern from './Footer/components/BackgroundPattern';
import DarkModeToggle from '../ui/DarkModeToggle';

const Footer = ({ darkMode, toggleDarkMode }) => {
  return (
    <footer
      className={`relative py-20 overflow-hidden transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white'
          : 'bg-gradient-to-br from-gray-100 via-gray-200 to-blue-100 text-gray-900'
      }`}
    >
      {/* Background Pattern */}
      <BackgroundPattern darkMode={darkMode} />

      {/* Dark Mode Toggle - Floating */}
      {toggleDarkMode && (
        <div className="absolute top-6 right-6 z-20">
          <div
            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              darkMode
                ? 'bg-white/10 border-white/20 hover:bg-white/20'
                : 'bg-black/10 border-black/20 hover:bg-black/20'
            }`}
          >
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              size="md"
            />
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Company Info - spans 4 columns */}
          <div className="lg:col-span-4">
            <CompanySection darkMode={darkMode} />
          </div>

          {/* Links Columns - spans 6 columns */}
          <div className="lg:col-span-6">
            <LinkColumns darkMode={darkMode} />
          </div>

          {/* Newsletter & Social - spans 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <NewsletterSection darkMode={darkMode} />
            <SocialSection darkMode={darkMode} />
          </div>
        </div>

        {/* Bottom Bar */}
        <BottomBar darkMode={darkMode} />
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute bottom-0 left-0 w-full h-px transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30'
            : 'bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-20'
        }`}
      ></div>
    </footer>
  );
};

export default Footer;