/**
 * @jest-environment node
 */
// src/app/api/auth/login/route.test.js
import { createMockSupabaseClient } from '@/test-utils/mockSupabase';

// Mock the lib/supabase module so the route's createAdminClient() returns
// our test client. This is the only mock the route depends on.
let mockClient;
jest.mock('@/lib/supabase', () => ({
  createAdminClient: jest.fn(() => mockClient),
}));

// Silence the route's console.error during the failure-path tests.
let consoleErrorSpy;
beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  consoleErrorSpy.mockRestore();
  jest.clearAllMocks();
});

function buildRequest(body, headers = {}) {
  // Minimal Request shim that the handler reads from.
  return {
    json: async () => body,
    headers: {
      get: (key) => headers[key.toLowerCase()] ?? null,
    },
  };
}

describe('POST /api/auth/login', () => {
  test('400 when username is missing', async () => {
    mockClient = createMockSupabaseClient();
    const { POST } = require('./route');

    const res = await POST(buildRequest({ password: 'x' }));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toMatchObject({ success: false });
    expect(mockClient.rpc).not.toHaveBeenCalled();
  });

  test('400 when password is missing', async () => {
    mockClient = createMockSupabaseClient();
    const { POST } = require('./route');

    const res = await POST(buildRequest({ username: 'admin' }));

    expect(res.status).toBe(400);
    expect(mockClient.rpc).not.toHaveBeenCalled();
  });

  test('500 when the Supabase RPC errors out', async () => {
    mockClient = createMockSupabaseClient({
      rpc: { authenticate_admin: { data: null, error: { message: 'boom' } } },
    });
    const { POST } = require('./route');

    const res = await POST(buildRequest({ username: 'admin', password: 'x' }));

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.success).toBe(false);
    // Error logged but no PII leaked in the response.
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('401 when credentials are rejected by the RPC', async () => {
    mockClient = createMockSupabaseClient({
      rpc: {
        authenticate_admin: {
          data: { success: false, message: 'Invalid credentials' },
          error: null,
        },
      },
    });
    const { POST } = require('./route');

    const res = await POST(buildRequest({ username: 'admin', password: 'wrong' }));

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ success: false, message: 'Invalid credentials' });
    // No session was created on a failed login.
    expect(mockClient.from).not.toHaveBeenCalled();
  });

  test('200 happy path: creates session, sets HttpOnly cookie, returns user', async () => {
    const fakeUser = { id: 'user-uuid-1', username: 'admin' };
    mockClient = createMockSupabaseClient({
      rpc: {
        authenticate_admin: {
          data: { success: true, user: fakeUser },
          error: null,
        },
      },
    });
    const { POST } = require('./route');

    const res = await POST(
      buildRequest(
        { username: ' admin ', password: 'admin123' }, // leading/trailing space
        { 'x-forwarded-for': '203.0.113.7', 'user-agent': 'JestUA' }
      )
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user).toEqual(fakeUser);
    expect(body.expiresAt).toBeTruthy();

    // RPC was called with the trimmed username.
    expect(mockClient.rpc).toHaveBeenCalledWith('authenticate_admin', {
      p_username: 'admin',
      p_password: 'admin123',
    });

    // Session row was inserted with the right shape.
    expect(mockClient.from).toHaveBeenCalledWith('admin_sessions');
    const sessionsBuilder = mockClient._tableBuilders.admin_sessions;
    expect(sessionsBuilder.insert).toHaveBeenCalledTimes(1);
    const insertArg = sessionsBuilder.insert.mock.calls[0][0];
    expect(insertArg.user_id).toBe(fakeUser.id);
    expect(insertArg.session_token).toMatch(/^[0-9a-f-]+-\d+$/i);
    expect(insertArg.ip_address).toBe('203.0.113.7');
    expect(insertArg.user_agent).toBe('JestUA');

    // Cookie is HttpOnly and SameSite=Strict — the security contract.
    const cookie = res.headers.get('set-cookie');
    expect(cookie).toMatch(/^admin_session=/);
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('SameSite=Strict');
    expect(cookie).toContain('Path=/');
  });

  test('falls back to "unknown" IP when x-forwarded-for is missing', async () => {
    mockClient = createMockSupabaseClient({
      rpc: {
        authenticate_admin: {
          data: { success: true, user: { id: 'u1' } },
          error: null,
        },
      },
    });
    const { POST } = require('./route');

    await POST(buildRequest({ username: 'a', password: 'b' }));

    const insertArg = mockClient._tableBuilders.admin_sessions.insert.mock.calls[0][0];
    expect(insertArg.ip_address).toBe('unknown');
    expect(insertArg.user_agent).toBe('Unknown');
  });

  test('500 when request.json() throws (malformed body)', async () => {
    mockClient = createMockSupabaseClient();
    const { POST } = require('./route');

    const badRequest = {
      json: async () => {
        throw new Error('not json');
      },
      headers: { get: () => null },
    };

    const res = await POST(badRequest);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.success).toBe(false);
  });
});
