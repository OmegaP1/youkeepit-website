// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

// Public client for read operations and RPC calls
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We handle sessions manually
    autoRefreshToken: false,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'X-Client-Info': 'youkeepit-admin-app',
    },
  },
});

// Server-side admin client (only available on server)
export const createAdminClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Admin client should only be used on server side');
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
  });
};

// Database security utilities
export class DatabaseSecurity {
  // Sanitize input to prevent injection attacks
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
      .replace(/['"\\]/g, '') // Remove quotes and backslashes
      .replace(/[;<>]/g, '') // Remove potentially dangerous characters
      .trim()
      .substring(0, 100); // Limit length
  }

  // Validate UUID format
  static isValidUUID(uuid) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  // Rate limiting for operations
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
      // This would typically be called server-side with admin client
      console.log('Security Event:', {
        event,
        details,
        timestamp: new Date().toISOString(),
      });

      // In a real implementation, you'd log to your security_logs table
      // This is just for demonstration
    } catch (error) {
      console.error('Failed to log security event:', error);
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
  },
};

// Get current environment config
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return DATABASE_CONFIG[env] || DATABASE_CONFIG.development;
};