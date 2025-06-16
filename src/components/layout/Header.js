// src/components/layout/Header.js
'use client';

import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Users, Building2 } from 'lucide-react';
import Link from 'next/link';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = href => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-all duration-300 ${
        darkMode
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-200'
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">Y</span>
            </div>
            <span
              className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              KeepMyKit
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map(item => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA & Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login Buttons */}
            <div className="flex items-center space-x-2">
              <Link href="/login/employee">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md">
                  <Users className="w-4 h-4" />
                  <span>Employee</span>
                </button>
              </Link>

              <Link href="/login/company">
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 border ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700 border-gray-600'
                      : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-300'
                  } shadow-md`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company</span>
                </button>
              </Link>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => scrollToSection('#pricing')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Demo
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t ${
            darkMode
              ? 'bg-gray-900 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map(item => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left py-2 text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Login Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
              <Link href="/login/employee">
                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                  <Users className="w-4 h-4" />
                  <span>Employee Login</span>
                </button>
              </Link>

              <Link href="/login/company">
                <button
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium border ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company Login</span>
                </button>
              </Link>
            </div>

            <button
              onClick={() => scrollToSection('#pricing')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4"
            >
              Get Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
