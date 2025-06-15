// src/components/ui/LoginButtons.js
'use client'

import React from 'react'
import Link from 'next/link'
import { Users, Building2, ArrowRight } from 'lucide-react'

const LoginButtons = ({ darkMode }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      {/* Employee Login Button */}
      <Link href="/login/employee">
        <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6" />
            <span>Employee Login</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center space-x-3">
            <Users className="w-6 h-6" />
            <span>Employee Login</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </button>
      </Link>

      {/* Company Login Button */}
      <Link href="/login/company">
        <button className={`group relative overflow-hidden px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-700 border-gray-600 hover:border-gray-500"
            : "bg-white text-gray-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
        } shadow-lg hover:shadow-xl`}>
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6" />
            <span>Company Login</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          
          {/* Subtle hover effect */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
            darkMode ? "bg-white" : "bg-gray-900"
          }`}></div>
        </button>
      </Link>
    </div>
  )
}

export default LoginButtons