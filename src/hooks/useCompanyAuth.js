// src/hooks/useCompanyAuth.js
'use client';

import { useState, useEffect } from 'react';

export function useCompanyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run auth check after client-side hydration
    if (!isClient) return;

    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('companyAuth');
        if (authData) {
          const parsed = JSON.parse(authData);
          // Check if token is still valid (not expired)
          if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
            setUser(parsed.user);
            setIsAuthenticated(true);
          } else {
            // Token expired, remove it
            localStorage.removeItem('companyAuth');
          }
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('companyAuth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isClient]);

  const login = async credentials => {
    if (!isClient) return { success: false, error: 'Client not ready' };

    setIsLoading(true);
    try {
      // Mock authentication - replace with actual API call
      if (
        credentials.email === 'admin@company.com' &&
        credentials.password === 'admin123'
      ) {
        const userData = {
          email: credentials.email,
          name: 'Admin User',
          role: 'company_admin',
        };

        const authData = {
          user: userData,
          token: 'mock-token-' + Date.now(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        };

        localStorage.setItem('companyAuth', JSON.stringify(authData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (!isClient) return;

    localStorage.removeItem('companyAuth');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    isClient,
  };
}
