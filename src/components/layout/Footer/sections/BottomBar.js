// src/components/layout/Footer/sections/BottomBar.js
'use client'

import React from 'react'

const BottomBar = () => {
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR Compliance', href: '/gdpr' }
  ]

  return (
    <div className="border-t border-white/10 pt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        {/* Copyright */}
        <div className="flex items-center space-x-4">
          <p className="text-gray-400 text-sm">
            &copy; 2025 YouKeepIt. All rights reserved.
          </p>
          
          {/* Security Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-300 text-xs font-medium">SSL Secured</span>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="flex flex-wrap items-center gap-6">
          {legalLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline decoration-blue-400"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>Made with ❤️ in Portugal</span>
          <span>•</span>
          <span>Version 2.1.0</span>
        </div>
      </div>
    </div>
  )
}

export default BottomBar