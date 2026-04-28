// src/components/layout/Footer.js
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import CompanySection from './Footer/sections/CompanySection';
import LinkColumns from './Footer/sections/LinkColumns';
import SocialSection from './Footer/sections/SocialSection';
import NewsletterSection from './Footer/sections/NewsletterSection';
import BottomBar from './Footer/sections/BottomBar';
import BackgroundPattern from './Footer/components/BackgroundPattern';

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const darkMode = mounted && resolvedTheme === 'dark';

  return (
    <footer className="relative py-20 overflow-hidden transition-all duration-500 bg-gradient-to-br from-gray-100 via-gray-200 to-blue-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 dark:text-white">
      <BackgroundPattern darkMode={darkMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <CompanySection darkMode={darkMode} />
          </div>

          <div className="lg:col-span-6">
            <LinkColumns darkMode={darkMode} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <NewsletterSection darkMode={darkMode} />
            <SocialSection darkMode={darkMode} />
          </div>
        </div>

        <BottomBar darkMode={darkMode} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px transition-all duration-500 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-20 dark:via-blue-500 dark:opacity-30"></div>
    </footer>
  );
};

export default Footer;