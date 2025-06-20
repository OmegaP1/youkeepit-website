// src/app/login/company/page.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Building2,
  Mail,
  Lock,
  ArrowLeft,
  Shield,
  CheckCircle,
  Users,
  Loader2,
} from 'lucide-react';

export default function CompanyLoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setDarkMode(savedTheme ? savedTheme === 'dark' : systemPreference);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/company/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Store authentication data
        const authData = {
          isAuthenticated: true,
          user: result.user,
          token: result.token,
          expiresAt: result.expiresAt,
          loginTime: new Date().toISOString(),
        };

        if (rememberMe) {
          localStorage.setItem('companyAuth', JSON.stringify(authData));
        } else {
          sessionStorage.setItem('companyAuth', JSON.stringify(authData));
        }

        // Redirect to company dashboard using the company slug
        window.location.href = `/company/${result.user.company_slug}`;
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-blue-500' : 'bg-blue-400'
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-purple-500' : 'bg-purple-400'
          }`}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <Link
          href="/"
          className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
            darkMode
              ? 'text-gray-300 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div
            className={`rounded-3xl shadow-2xl border backdrop-blur-xl ${
              darkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white/80 border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode
                    ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'
                }`}
              >
                Company Portal
              </h1>
              <p
                className={`text-lg flex items-center justify-center space-x-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Secure access to your dashboard</span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-8 mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
              {/* Email */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className={`w-full pl-11 pr-4 py-4 rounded-2xl border text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your email address"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={e =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`w-full pl-11 pr-12 py-4 rounded-2xl border text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span
                    className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password/company"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-medium text-base transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Sign In</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Don't have access?{' '}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-500 transition-colors font-medium"
              >
                Contact your administrator
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div
            className={`mt-6 p-4 rounded-2xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/80'
            } backdrop-blur-xl border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <h3
              className={`text-sm font-semibold mb-3 flex items-center ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              Demo Credentials
            </h3>
            <div className="space-y-2 text-xs">
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <p className="font-medium text-blue-600">Acme Corporation</p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  admin@acme-corp.com / admin123
                </p>
              </div>
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <p className="font-medium text-purple-600">TechStart Inc</p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  admin@techstart.io / techstart123
                </p>
              </div>
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <p className="font-medium text-green-600">Global Solutions</p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  admin@globalsolutions.com / global123
                </p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { icon: Shield, label: 'Secure Login' },
              { icon: Lock, label: 'Encrypted Data' },
              { icon: CheckCircle, label: 'Verified Access' },
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-xl ${
                  darkMode ? 'bg-gray-800/30' : 'bg-white/60'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <feature.icon
                  className={`w-6 h-6 mx-auto mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                />
                <p
                  className={`text-xs font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
