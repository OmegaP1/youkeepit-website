// src/components/company/CompanyAuth.js
'use client';

import { useState } from 'react';
import {
  Building2,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  ArrowLeft,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function CompanyAuth({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await onLogin(formData);

    if (!result.success) {
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-purple-400 to-blue-500 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 bg-gradient-to-br from-green-400 to-blue-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-8 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Login Card */}
          <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Company Portal
              </h1>
              <p className="text-lg text-gray-600 flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>Manage your IT equipment lifecycle</span>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mb-6 p-4 rounded-2xl border bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Secure Company Access
                  </p>
                  <p className="text-xs text-green-600">
                    End-to-end encrypted authentication
                  </p>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl border bg-gradient-to-r from-red-50 to-pink-50 border-red-200 animate-shake">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {error}
                  </span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="admin@company.com"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e =>
                      handleInputChange('password', e.target.value)
                    }
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-900">
                    Demo Credentials
                  </p>
                </div>
                <p className="text-sm text-blue-700">
                  Email: admin@company.com
                </p>
                <p className="text-sm text-blue-700">Password: admin123</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-3 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Secure access to KeepMyKit Company Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
