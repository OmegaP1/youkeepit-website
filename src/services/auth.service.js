// src/services/auth.service.js
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export class AuthService {
  // Generate secure session token
  static generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Authenticate admin user
  static async authenticateAdmin(username, password) {
    try {
      const { data, error } = await supabase.rpc('authenticate_admin', {
        p_username: username,
        p_password: password
      });

      if (error) {
        console.error('Authentication error:', error);
        return { success: false, message: 'Authentication failed' };
      }

      const result = typeof data === 'string' ? JSON.parse(data) : data;

      if (result.success) {
        // Create session token
        const sessionToken = this.generateSessionToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Store session in database
        const { error: sessionError } = await supabase
          .from('admin_sessions')
          .insert({
            user_id: result.user.id,
            session_token: sessionToken,
            expires_at: expiresAt.toISOString(),
            ip_address: '127.0.0.1', // You can get real IP from request
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
          });

        if (sessionError) {
          console.error('Session creation error:', sessionError);
          return { success: false, message: 'Session creation failed' };
        }

        return {
          success: true,
          user: result.user,
          sessionToken,
          expiresAt
        };
      }

      return result;
    } catch (error) {
      console.error('Authentication service error:', error);
      return { success: false, message: 'Authentication service error' };
    }
  }

  // Validate session token
  static async validateSession(sessionToken) {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .select(`
          id,
          expires_at,
          admin_users (
            id,
            username,
            email,
            full_name,
            role,
            is_active
          )
        `)
        .eq('session_token', sessionToken)
        .eq('admin_users.is_active', true)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return { valid: false };
      }

      return {
        valid: true,
        user: data.admin_users,
        expiresAt: data.expires_at
      };
    } catch (error) {
      console.error('Session validation error:', error);
      return { valid: false };
    }
  }

  // Logout and invalidate session
  static async logout(sessionToken) {
    try {
      const { error } = await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', sessionToken);

      if (error) {
        console.error('Logout error:', error);
        return { success: false };
      }

      return { success: true };
    } catch (error) {
      console.error('Logout service error:', error);
      return { success: false };
    }
  }

  // Change password
  static async changePassword(username, oldPassword, newPassword) {
    try {
      const { data, error } = await supabase.rpc('change_admin_password', {
        p_username: username,
        p_old_password: oldPassword,
        p_new_password: newPassword
      });

      if (error) {
        console.error('Password change error:', error);
        return { success: false, message: 'Password change failed' };
      }

      const result = typeof data === 'string' ? JSON.parse(data) : data;
      return result;
    } catch (error) {
      console.error('Password change service error:', error);
      return { success: false, message: 'Password change service error' };
    }
  }

  // Get all active sessions for a user
  static async getUserSessions(userId) {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .select('id, created_at, ip_address, user_agent, expires_at')
        .eq('user_id', userId)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get sessions error:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Get sessions service error:', error);
      return [];
    }
  }

  // Revoke specific session
  static async revokeSession(sessionId) {
    try {
      const { error } = await supabase
        .from('admin_sessions')
        .delete()
        .eq('id', sessionId);

      return { success: !error };
    } catch (error) {
      console.error('Revoke session error:', error);
      return { success: false };
    }
  }
}

// Browser-side authentication state management
export class AuthStore {
  static SESSION_KEY = 'admin_session_token';
  static USER_KEY = 'admin_user_data';

  // Save authentication data to localStorage
  static saveAuth(sessionToken, user, expiresAt) {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(this.SESSION_KEY, sessionToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify({
      ...user,
      expiresAt
    }));
  }

  // Get stored session token
  static getSessionToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.SESSION_KEY);
  }

  // Get stored user data
  static getUser() {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      const user = JSON.parse(userData);
      // Check if session is expired
      if (new Date(user.expiresAt) <= new Date()) {
        this.clearAuth();
        return null;
      }
      return user;
    } catch {
      return null;
    }
  }

  // Clear authentication data
  static clearAuth() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = this.getSessionToken();
    const user = this.getUser();
    return !!(token && user);
  }
}