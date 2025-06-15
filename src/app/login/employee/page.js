// src/app/login/employee/page.js
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft, Users, CheckCircle } from 'lucide-react'

export default function EmployeeLoginPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Demo validation
      if (formData.email === 'employee@demo.com' && formData.password === 'demo123') {
        // Successful login redirect
        window.location.href = '/employee/dashboard'
      } else {
        setError('Invalid email or password. Try: employee@demo.com / demo123')
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
          darkMode ? "bg-blue-600" : "bg-blue-300"
        }`}></div>
        <div className={`absolute -bottom-40 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? "bg-purple-600" : "bg-purple-300"
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
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Employee Portal
              </h1>
              <p className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Access your device marketplace
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                      darkMode 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500" 
                        : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter your email"
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
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 ${
                      darkMode 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500" 
                        : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter your password"
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
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className={`ml-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Remember me
                  </span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className={`mt-6 p-4 rounded-xl border ${
              darkMode 
                ? "bg-blue-900/30 border-blue-700/50" 
                : "bg-blue-50 border-blue-200"
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className={`text-sm font-medium ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}>Demo Credentials</span>
              </div>
              <p className={`text-xs ${
                darkMode ? "text-blue-200" : "text-blue-600"
              }`}>
                Email: employee@demo.com<br />
                Password: demo123
              </p>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                New employee?{' '}
                <Link href="/register/employee" className="text-blue-600 hover:text-blue-800 font-medium">
                  Create your account
                </Link>
              </p>
            </div>

            {/* Switch to Company Login */}
            <div className="mt-4 text-center">
              <p className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Company admin?{' '}
                <Link href="/login/company" className="text-purple-600 hover:text-purple-800 font-medium">
                  Company Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}