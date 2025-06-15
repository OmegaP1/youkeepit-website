// src/app/login/company/page.js
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Building2, Mail, Lock, ArrowLeft, Shield, CheckCircle, Users } from 'lucide-react'

export default function CompanyLoginPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(savedTheme ? savedTheme === 'dark' : systemPreference)
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Demo validation
      if (
        formData.email === 'admin@company.com' && 
        formData.password === 'admin123' && 
        formData.companyCode === 'DEMO'
      ) {
        // Successful login redirect
        window.location.href = '/company/dashboard'
      } else {
        setError('Invalid credentials or company code. Try: admin@company.com / admin123 / DEMO')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? "bg-purple-600" : "bg-purple-300"
        }`}></div>
        <div className={`absolute -bottom-40 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? "bg-blue-600" : "bg-blue-300"
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 ${
          darkMode ? "bg-green-600" : "bg-green-300"
        }`}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link href="/" className={`inline-flex items-center space-x-2 mb-8 text-sm font-medium transition-colors hover:scale-105 transform ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Login Card */}
          <div className={`glass backdrop-blur-xl p-8 rounded-2xl shadow-2xl border ${
            darkMode 
              ? "bg-gray-800/30 border-gray-700/50" 
              : "bg-white/70 border-white/50"
          }`}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Company Portal
              </h1>
              <p className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Manage your IT equipment lifecycle
              </p>
            </div>

            {/* Security Badge */}
            <div className={`mb-6 p-3 rounded-lg border ${
              darkMode 
                ? "bg-green-900/30 border-green-700/50" 
                : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className={`text-xs font-medium ${
                  darkMode ? "text-green-300" : "text-green-700"
                }`}>
                  Enterprise-grade security & compliance
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Code Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Company Code
                </label>
                <div className="relative">
                  <Building2 className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="text"
                    value={formData.companyCode}
                    onChange={(e) => handleInputChange('companyCode', e.target.value.toUpperCase())}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 uppercase ${
                      darkMode 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500" 
                        : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                    }`}
                    placeholder="Enter company code"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 ${
                      darkMode 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500" 
                        : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                    }`}
                    placeholder="Enter admin email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 ${
                      darkMode 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500" 
                        : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                    }`}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className={`ml-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Remember me
                  </span>
                </label>
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password || !formData.companyCode}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className={`mt-6 p-4 rounded-xl border ${
              darkMode 
                ? "bg-purple-900/30 border-purple-700/50" 
                : "bg-purple-50 border-purple-200"
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-purple-600" />
                <span className={`text-sm font-medium ${
                  darkMode ? "text-purple-300" : "text-purple-700"
                }`}>Demo Credentials</span>
              </div>
              <p className={`text-xs ${
                darkMode ? "text-purple-200" : "text-purple-600"
              }`}>
                Company Code: DEMO<br />
                Email: admin@company.com<br />
                Password: admin123
              </p>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                New company?{' '}
                <Link href="/register/company" className="text-purple-600 hover:text-purple-800 font-medium">
                  Request Enterprise Access
                </Link>
              </p>
            </div>

            {/* Switch to Employee Login */}
            <div className="mt-4 text-center">
              <p className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Employee?{' '}
                <Link href="/login/employee" className="text-blue-600 hover:text-blue-800 font-medium">
                  Employee Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}