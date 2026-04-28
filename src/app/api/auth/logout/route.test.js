/**
 * @jest-environment node
 */
// src/app/api/auth/logout/route.test.js
import { createMockSupabaseClient } from '@/test-utils/mockSupabase';

let mockClient;
jest.mock('@/lib/supabase', () => ({
  createAdminClient: jest.fn(() => mockClient),
}));

afterEach(() => {
  jest.clearAllMocks();
});

function buildRequest(cookies = {}) {
  return {
    cookies: {
      get: (name) =>
        cookies[name] !== undefined ? { value: cookies[name] } : undefined,
    },
  };
}

describe('POST /api/auth/logout', () => {
  test('clears cookie even when there is no session', async () => {
    mockClient = createMockSupabaseClient();
    const { POST } = require('./route');

    const res = await POST(buildRequest({}));

    expect(res.status).toBe(200);
    expect(mockClient.from).not.toHaveBeenCalled();
    // Cookie cleared with Max-Age=0.
    const cookie = res.headers.get('set-cookie');
    expect(cookie).toMatch(/admin_session=;/);
    expect(cookie).toContain('Max-Age=0');
    expect(cookie).toContain('HttpOnly');
  });

  test('deletes the session row when a token is present', async () => {
    mockClient = createMockSupabaseClient({
      tables: { admin_sessions: { result: { data: null, error: null } } },
    });
    const { POST } = require('./route');

    const res = await POST(buildRequest({ admin_session: 'tok-abc' }));

    expect(res.status).toBe(200);
    expect(mockClient.from).toHaveBeenCalledWith('admin_sessions');
    const sessions = mockClient._tableBuilders.admin_sessions;
    expect(sessions.delete).toHaveBeenCalled();
    expect(sessions.eq).toHaveBeenCalledWith('session_token', 'tok-abc');
  });

  test('500 when supabase throws unexpectedly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockClient = {
      from: jest.fn(() => {
        throw new Error('boom');
      }),
      rpc: jest.fn(),
    };
    const { POST } = require('./route');

    const res = await POST(buildRequest({ admin_session: 'tok' }));

    expect(res.status).toBe(500);
    consoleErrorSpy.mockRestore();
  });
});
