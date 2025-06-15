// src/components/ui/DarkModeToggle.js
'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = ({ darkMode, toggleDarkMode, size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-all duration-200 ${
        darkMode
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 hover:scale-105'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {darkMode ? (
        <Sun className={`${sizes[size]} transition-transform duration-200`} />
      ) : (
        <Moon className={`${sizes[size]} transition-transform duration-200`} />
      )}
    </button>
  );
};

export default DarkModeToggle;
