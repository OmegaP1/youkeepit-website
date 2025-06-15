// src/components/layout/Footer.js
'use client';

import React from 'react';
import CompanySection from './Footer/sections/CompanySection';
import LinkColumns from './Footer/sections/LinkColumns';
import SocialSection from './Footer/sections/SocialSection';
import NewsletterSection from './Footer/sections/NewsletterSection';
import BottomBar from './Footer/sections/BottomBar';
import BackgroundPattern from './Footer/components/BackgroundPattern';

const Footer = ({ darkMode }) => {
  return (
    <footer className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Company Info - spans 4 columns */}
          <div className="lg:col-span-4">
            <CompanySection />
          </div>

          {/* Links Columns - spans 6 columns */}
          <div className="lg:col-span-6">
            <LinkColumns />
          </div>

          {/* Newsletter & Social - spans 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <NewsletterSection />
            {/* <SocialSection /> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <BottomBar />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;
