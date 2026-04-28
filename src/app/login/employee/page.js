// src/app/login/employee/page.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Clock } from 'lucide-react';

export default function EmployeeLoginPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(savedTheme ? savedTheme === 'dark' : systemPreference);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-blue-600' : 'bg-blue-300'
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-purple-600' : 'bg-purple-300'
          }`}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className={`inline-flex items-center space-x-2 mb-8 text-sm font-medium transition-colors ${
              darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div
            className={`backdrop-blur-xl p-8 rounded-2xl shadow-2xl border ${
              darkMode
                ? 'bg-gray-800/30 border-gray-700/50'
                : 'bg-white/70 border-white/50'
            }`}
          >
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Employee Portal
              </h1>
              <p
                className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Access your device marketplace
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border text-center ${
                darkMode
                  ? 'bg-blue-900/30 border-blue-700/50'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <Clock
                className={`w-10 h-10 mx-auto mb-3 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}
              />
              <h2
                className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-blue-200' : 'text-blue-700'
                }`}
              >
                Coming Soon
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? 'text-blue-200' : 'text-blue-700'
                }`}
              >
                The employee portal isn&apos;t available yet. We&apos;re
                finishing the marketplace experience and will email everyone
                once it&apos;s ready.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p
                className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Company admin?{' '}
                <Link
                  href="/login/company"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Company Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
