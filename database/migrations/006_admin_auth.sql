-- database/migrations/006_admin_auth.sql
-- Admin authentication: admin_users + admin_sessions tables, authenticate_admin RPC,
-- and a seed admin user.
--
-- Run this in the Supabase SQL Editor.
-- Default credentials created at the bottom: username "admin", password "admin123".
-- CHANGE THE PASSWORD before exposing this app to anyone but you.

-- Required for crypt() / gen_salt() bcrypt hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================================
-- TABLES
-- =====================================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email         VARCHAR(255),
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  last_login    TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  ip_address    TEXT,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_token   ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user    ON admin_sessions(user_id);

-- Lock the tables down. The service-role key bypasses RLS, so the API routes
-- still work; the anon key cannot read or write these tables from the browser.
ALTER TABLE admin_users    ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- AUTHENTICATION RPC
-- Called from /api/auth/login as supabase.rpc('authenticate_admin', { p_username, p_password })
-- Returns JSON: { success: true, user: { id, username, email } }  on success
--               { success: false, message: '...' }                on failure
-- =====================================================================

CREATE OR REPLACE FUNCTION authenticate_admin(
  p_username TEXT,
  p_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user RECORD;
BEGIN
  SELECT id, username, email, is_active, password_hash
    INTO v_user
    FROM admin_users
   WHERE username = p_username
     AND is_active = TRUE
   LIMIT 1;

  IF v_user IS NULL THEN
    RETURN json_build_object('success', FALSE, 'message', 'Invalid credentials');
  END IF;

  IF v_user.password_hash <> crypt(p_password, v_user.password_hash) THEN
    RETURN json_build_object('success', FALSE, 'message', 'Invalid credentials');
  END IF;

  UPDATE admin_users SET last_login = NOW() WHERE id = v_user.id;

  RETURN json_build_object(
    'success', TRUE,
    'user', json_build_object(
      'id',       v_user.id,
      'username', v_user.username,
      'email',    v_user.email
    )
  );
END;
$$;

-- Allow the service role (used by API routes) to call this; the anon role
-- shouldn't need direct access since the routes mediate it.
GRANT EXECUTE ON FUNCTION authenticate_admin(TEXT, TEXT) TO service_role;

-- =====================================================================
-- SEED ADMIN USER
-- username: admin
-- password: admin123
-- Re-running this script rotates the password back to admin123.
-- =====================================================================

INSERT INTO admin_users (username, password_hash, email)
VALUES (
  'admin',
  crypt('admin123', gen_salt('bf', 10)),
  'admin@youkeepit.local'
)
ON CONFLICT (username) DO UPDATE
  SET password_hash = EXCLUDED.password_hash,
      email         = EXCLUDED.email,
      is_active     = TRUE;
