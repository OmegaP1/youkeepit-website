// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { DatabaseSecurity } from '@/lib/secure-supabase';
import rateLimit from '@/lib/rate-limit';

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per window
});

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Apply rate limiting
    const isAllowed = DatabaseSecurity.checkRateLimit(
      `login_${clientIP}`, 
      5, // Max 5 attempts
      15 * 60 * 1000 // Per 15 minutes
    );

    if (!isAllowed) {
      await DatabaseSecurity.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        ip: clientIP,
        endpoint: '/api/auth/login',
        userAgent: request.headers.get('user-agent')
      });

      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const cleanUsername = DatabaseSecurity.sanitizeInput(username);
    
    // Attempt authentication
    const result = await AuthService.authenticateAdmin(cleanUsername, password);

    if (result.success) {
      await DatabaseSecurity.logSecurityEvent('LOGIN_SUCCESS', {
        username: cleanUsername,
        ip: clientIP,
        userAgent: request.headers.get('user-agent')
      });

      // Remove sensitive data before sending response
      const { sessionToken, ...safeResult } = result;

      return NextResponse.json({
        success: true,
        user: result.user,
        expiresAt: result.expiresAt
      }, {
        status: 200,
        headers: {
          'Set-Cookie': `admin_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${24 * 60 * 60}; Path=/`
        }
      });
    } else {
      await DatabaseSecurity.logSecurityEvent('LOGIN_FAILED', {
        username: cleanUsername,
        ip: clientIP,
        userAgent: request.headers.get('user-agent'),
        reason: result.message
      });

      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login API error:', error);
    
    await DatabaseSecurity.logSecurityEvent('LOGIN_ERROR', {
      error: error.message,
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json(
      { success: false, message: 'Authentication service error' },
      { status: 500 }
    );
  }
}

// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { DatabaseSecurity } from '@/lib/secure-supabase';

export async function POST(request) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (sessionToken) {
      await AuthService.logout(sessionToken);
      
      await DatabaseSecurity.logSecurityEvent('LOGOUT', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent')
      });
    }

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'admin_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
        }
      }
    );

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout error' },
      { status: 500 }
    );
  }
}

// src/app/api/auth/validate/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { valid: false, message: 'No session token' },
        { status: 401 }
      );
    }

    const validation = await AuthService.validateSession(sessionToken);

    if (validation.valid) {
      return NextResponse.json({
        valid: true,
        user: validation.user,
        expiresAt: validation.expiresAt
      });
    } else {
      return NextResponse.json(
        { valid: false, message: 'Invalid session' },
        { 
          status: 401,
          headers: {
            'Set-Cookie': 'admin_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
          }
        }
      );
    }

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { valid: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}

// src/app/api/auth/change-password/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { DatabaseSecurity } from '@/lib/secure-supabase';

export async function POST(request) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate session
    const validation = await AuthService.validateSession(sessionToken);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Current and new passwords are required' },
        { status: 400 }
      );
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' 
        },
        { status: 400 }
      );
    }

    const result = await AuthService.changePassword(
      validation.user.username,
      currentPassword,
      newPassword
    );

    if (result.success) {
      await DatabaseSecurity.logSecurityEvent('PASSWORD_CHANGED', {
        username: validation.user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Change password API error:', error);
    return NextResponse.json(
      { success: false, message: 'Password change service error' },
      { status: 500 }
    );
  }
}

// src/lib/rate-limit.js
const rateLimitMap = new Map();

export default function rateLimit(options = {}) {
  const {
    interval = 60000, // 1 minute
    uniqueTokenPerInterval = 500,
  } = options;

  return {
    check: (limit, token) => {
      const tokenKey = `${token}_${Math.floor(Date.now() / interval)}`;
      const tokenCount = rateLimitMap.get(tokenKey) || [0];
      
      if (tokenCount[0] === 0) {
        rateLimitMap.set(tokenKey, tokenCount);
      }
      
      tokenCount[0] += 1;
      
      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;
      
      return { isRateLimited, limit, current: currentUsage, remaining: limit - currentUsage };
    },
  };
}