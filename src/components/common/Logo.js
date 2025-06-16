'use client'

import React from 'react'
import { Shield, RotateCcw } from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'

const Logo = ({ variant = 'default', size = 'md' }) => {
  const { darkMode } = useDarkMode()

  const sizes = {
    sm: {
      icon: 'w-8 h-8',
      iconSize: 'w-4 h-4',
      refresh: 'w-2 h-2',
      text: 'text-lg'
    },
    md: {
      icon: 'w-10 h-10',
      iconSize: 'w-6 h-6',
      refresh: 'w-3 h-3',
      text: 'text-xl'
    },
    lg: {
      icon: 'w-12 h-12',
      iconSize: 'w-7 h-7',
      refresh: 'w-4 h-4',
      text: 'text-2xl'
    }
  }

  const currentSize = sizes[size]

  const textColor = variant === 'light' 
    ? 'text-white' 
    : darkMode 
      ? 'text-white' 
      : 'text-gray-900'

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div
          className={`${currentSize.icon} rounded-xl bg-blue-600 flex items-center justify-center`}
        >
          <Shield className={`${currentSize.iconSize} text-white`} />
          <RotateCcw
            className={`${currentSize.refresh} text-white absolute -top-1 -right-1`}
          />
        </div>
      </div>
      <span className={`${currentSize.text} font-bold ${textColor}`}>
        KeepMyKit
      </span>
    </div>
  );
}

export default Logo