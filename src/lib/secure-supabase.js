// src/lib/secure-supabase.js
import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Server-side only

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

// Public client for read operations (RLS protected)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable built-in auth for security
    autoRefreshToken: false,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'nextjs-admin-app'
    }
  }
});

// Admin client for authenticated operations (server-side only)
export const supabaseAdmin = typeof window === 'undefined' && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: 'public'
      }
    })
  : null;

// Secure client factory for admin operations
export class SecureSupabaseClient {
  constructor(sessionToken) {
    this.sessionToken = sessionToken;
    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'X-Session-Token': sessionToken,
          'X-Client-Info': 'nextjs-admin-app'
        }
      }
    });
  }

  // Get client with session authentication
  getClient() {
    return this.client;
  }

  // Validate session before operations
  async validateSession() {
    try {
      const { data, error } = await this.client
        .from('admin_sessions')
        .select('expires_at')
        .eq('session_token', this.sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      return !error && data;
    } catch {
      return false;
    }
  }
}

// Database security utilities
export class DatabaseSecurity {
  // Sanitize input to prevent SQL injection
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/['"\\]/g, '') // Remove quotes and backslashes
      .replace(/[;<>]/g, '') // Remove potentially dangerous characters
      .trim();
  }

  // Validate UUID format
  static isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  // Rate limiting for database operations
  static rateLimiter = new Map();

  static checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!this.rateLimiter.has(identifier)) {
      this.rateLimiter.set(identifier, []);
    }

    const requests = this.rateLimiter.get(identifier);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }

    // Add current request
    validRequests.push(now);
    this.rateLimiter.set(identifier, validRequests);
    
    return true; // Request allowed
  }

  // Log security events
  static async logSecurityEvent(event, details = {}) {
    try {
      const logEntry = {
        event_type: event,
        details: JSON.stringify(details),
        timestamp: new Date().toISOString(),
        ip_address: details.ip || 'unknown',
        user_agent: details.userAgent || 'unknown'
      };

      if (supabaseAdmin) {
        await supabaseAdmin
          .from('security_logs')
          .insert([logEntry]);
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  // Validate admin permissions
  static async validateAdminPermission(sessionToken, requiredRole = 'admin') {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .select(`
          admin_users!inner (
            role,
            is_active
          )
        `)
        .eq('session_token', sessionToken)
        .eq('admin_users.is_active', true)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) return false;

      const userRole = data.admin_users.role;
      
      // Role hierarchy: super_admin > admin
      if (requiredRole === 'admin') {
        return userRole === 'admin' || userRole === 'super_admin';
      }
      
      if (requiredRole === 'super_admin') {
        return userRole === 'super_admin';
      }

      return false;
    } catch {
      return false;
    }
  }
}

// Environment-specific configurations
export const DATABASE_CONFIG = {
  development: {
    enableLogging: true,
    rateLimitRequests: 100,
    rateLimitWindow: 60000,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  },
  production: {
    enableLogging: true,
    rateLimitRequests: 10,
    rateLimitWindow: 60000,
    sessionTimeout: 8 * 60 * 60 * 1000, // 8 hours
  }
};

// Get current environment config
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return DATABASE_CONFIG[env] || DATABASE_CONFIG.development;
};