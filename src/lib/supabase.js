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
      'X-Client-Info': 'KeepMyKit-admin-app',
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

// NOTE: Server-side rate limiting is NOT implemented in this app.
// The previous in-memory rate limiter that lived here was misleading: each
// Vercel serverless invocation gets its own process, so a per-instance Map
// cannot enforce a real limit. For production rate limiting, use a shared
// store such as Upstash Redis or @vercel/firewall instead.