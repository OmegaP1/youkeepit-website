// src/services/auth.service.js
export class AuthService {
  // Authenticate admin user
  static async authenticateAdmin(username, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          user: result.user,
          expiresAt: result.expiresAt,
        };
      } else {
        return {
          success: false,
          message: result.message || 'Authentication failed',
        };
      }
    } catch (error) {
      console.error('Authentication service error:', error);
      return {
        success: false,
        message: 'Authentication service unavailable',
      };
    }
  }

  // Validate session token
  static async validateSession() {
    try {
      const response = await fetch('/api/auth/validate', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return { valid: false };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Session validation error:', error);
      return { valid: false };
    }
  }

  // Logout and invalidate session
  static async logout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Logout service error:', error);
      return false;
    }
  }
}

// Auth storage helper for client-side state management
export class AuthStore {
  static saveAuth(user, expiresAt) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_user', JSON.stringify(user));
      localStorage.setItem('admin_expires', expiresAt);
    }
  }

  static getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('admin_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static clearAuth() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_expires');
    }
  }

  static isSessionExpired() {
    if (typeof window !== 'undefined') {
      const expiresAt = localStorage.getItem('admin_expires');
      if (!expiresAt) return true;
      return new Date() > new Date(expiresAt);
    }
    return true;
  }
}
