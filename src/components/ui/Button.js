'use client'

import React from 'react'
import { useDarkMode } from '@/hooks/useDarkMode'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const { darkMode } = useDarkMode()

  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 focus:ring-blue-300',
    secondary: darkMode 
      ? 'border-2 border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-600' 
      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    outline: darkMode
      ? 'border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white focus:ring-blue-400'
      : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300',
    ghost: darkMode
      ? 'text-gray-300 hover:bg-gray-800 focus:ring-gray-600'
      : 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 focus:ring-red-300'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button