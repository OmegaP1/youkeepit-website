// src/components/layout/Footer/sections/CompanySection.js
'use client'

import React from 'react'
import Logo from '../components/Logo'
import StatsGrid from '../components/StatsGrid'

const CompanySection = () => {
  return (
    <div className="space-y-8">
      {/* Logo and Company Info */}
      <div className="space-y-6">
        <Logo />
        
        <p className="text-gray-300 text-lg leading-relaxed max-w-md">
          Transforming IT equipment transitions for modern companies through secure, 
          sustainable, and employee-focused solutions that recover 60-80% of device value.
        </p>
        
        {/* Trust Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 text-sm font-medium">SOC 2 Type II Certified</span>
        </div>
      </div>
      
      {/* Company Stats */}
      {/* <StatsGrid /> */}
    </div>
  )
}

export default CompanySection