// src/middleware.js
// Optional: Add middleware for admin protection
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Add any middleware logic here, such as:
  // - Admin authentication checks
  // - Rate limiting
  // - Logging
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Add admin authentication logic here if needed
    // For now, we'll just allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}