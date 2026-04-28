// src/app/admin/page.js
"use client";

import { useState, useEffect } from "react";
import SecureAdminLogin from '@/components/admin/SecureAdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/validate', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (status, userData) => {
    setIsAuthenticated(status);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">
            Verifying authentication...
          </p>
          <p className="text-blue-200 text-sm mt-2">
            Please wait while we check your session
          </p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated, otherwise show dashboard
  return (
    <>
      {!isAuthenticated ? (
        <SecureAdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
}