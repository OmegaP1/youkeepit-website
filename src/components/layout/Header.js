// src/components/layout/Header.js
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Users, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg transition-all duration-300 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">Y</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              KeepMyKit
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link href="/login/employee">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
                >
                  <Users className="w-4 h-4" />
                  <span>Employee</span>
                </button>
              </Link>

              <Link href="/login/company">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-md"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company</span>
                </button>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg transition-all duration-200 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {mounted && isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <a
              href="#pricing"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Demo
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300"
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

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
              <Link href="/login/employee">
                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  <Users className="w-4 h-4" />
                  <span>Employee Login</span>
                </button>
              </Link>

              <Link href="/login/company">
                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company Login</span>
                </button>
              </Link>
            </div>

            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4"
            >
              Get Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
