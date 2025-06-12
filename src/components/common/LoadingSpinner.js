// src/components/common/LoadingSpinner.js
'use client'

import React from 'react'

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
    </div>
  )
}

export const LoadingScreen = ({ message = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="xl" className="mx-auto mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  </div>
)

export default LoadingSpinner