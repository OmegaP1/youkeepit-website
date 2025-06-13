// src/components/admin/SecureAdminLogin.js
"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Shield, AlertTriangle } from 'lucide-react';
import { AuthService, AuthStore } from '@/services/auth.service';

const SecureAdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Rate limiting - block after 5 failed attempts
  const maxAttempts = 5;
  const isBlocked = attempts >= maxAttempts;

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await AuthService.authenticateAdmin(
        credentials.username.trim(),
        credentials.password
      );

      if (result.success) {
        // Save authentication data
        AuthStore.saveAuth(
          result.sessionToken,
          result.user,
          result.expiresAt
        );

        // Reset attempts on successful login
        setAttempts(0);
        
        // Call parent login handler
        onLogin(true, result.user);
      } else {
        setAttempts(prev => prev + 1);
        setError(result.message || 'Invalid credentials');
        
        // Clear password field on failed attempt
        setCredentials(prev => ({
          ...prev,
          password: ''
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Authentication service unavailable. Please try again later.');
      setAttempts(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const resetAttempts = () => {
    setAttempts(0);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Secure Admin Portal
          </h2>
          <p className="text-gray-600">Enterprise-grade authentication</p>
        </div>

        {/* Rate Limiting Warning */}
        {attempts > 2 && !isBlocked && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-700">
                Warning: {maxAttempts - attempts} attempts remaining
              </p>
            </div>
          </div>
        )}

        {/* Blocked Message */}
        {isBlocked && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-sm text-red-700">
                  Account temporarily locked due to failed attempts
                </p>
              </div>
              <button
                onClick={resetAttempts}
                className="text-xs text-red-600 hover:text-red-800 underline"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter your username"
                required
                disabled={loading || isBlocked}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                required
                disabled={loading || isBlocked}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                disabled={loading || isBlocked}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isBlocked || !credentials.username || !credentials.password}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Authenticating...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-700 font-medium mb-1">Security Notice</p>
              <p className="text-xs text-blue-600">
                This portal uses enterprise-grade encryption and session management. 
                All access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-1">Demo Credentials:</p>
          <p className="text-xs text-gray-500">
            Username: <code className="bg-gray-200 px-1 rounded">Danilo</code> or <code className="bg-gray-200 px-1 rounded">Joao</code>
          </p>
          <p className="text-xs text-gray-500">
            Password: <code className="bg-gray-200 px-1 rounded">StrongPassword123!</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureAdminLogin;