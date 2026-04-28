/**
 * @jest-environment node
 */
// src/app/api/company/auth/login/route.test.js
import { createMockSupabaseClient } from '@/test-utils/mockSupabase';

let mockClient;
jest.mock('@/lib/supabase', () => ({
  createAdminClient: jest.fn(() => mockClient),
}));

let consoleErrorSpy;
let consoleWarnSpy;
beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  consoleErrorSpy.mockRestore();
  consoleWarnSpy.mockRestore();
  jest.clearAllMocks();
});

function buildRequest(body, headers = {}) {
  return {
    json: async () => body,
    headers: { get: (key) => headers[key.toLowerCase()] ?? null },
  };
}

const fakeUser = {
  id: 'user-1',
  company_id: 'company-1',
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'jane@example.com',
};

describe('POST /api/company/auth/login', () => {
  test('400 when email or password missing', async () => {
    mockClient = createMockSupabaseClient();
    const { POST } = require('./route');

    const res = await POST(buildRequest({ email: 'a@b.com' }));
    expect(res.status).toBe(400);
  });

  test('500 when authenticate_company_user RPC errors', async () => {
    mockClient = createMockSupabaseClient({
      rpc: { authenticate_company_user: { data: null, error: { message: 'oops' } } },
    });
    const { POST } = require('./route');

    const res = await POST(buildRequest({ email: 'a@b.com', password: 'x' }));
    expect(res.status).toBe(500);
  });

  test('401 when RPC reports invalid credentials', async () => {
    mockClient = createMockSupabaseClient({
      rpc: {
        authenticate_company_user: {
          data: { success: false, message: 'no such user' },
          error: null,
        },
      },
    });
    const { POST } = require('./route');

    const res = await POST(buildRequest({ email: 'x@y.com', password: 'wrong' }));

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ success: false, message: 'no such user' });
  });

  test('happy path: lowercases email, creates session, logs activity', async () => {
    mockClient = createMockSupabaseClient({
      rpc: {
        authenticate_company_user: {
          data: { success: true, user: fakeUser },
          error: null,
        },
        log_activity: { data: null, error: null },
      },
    });
    const { POST } = require('./route');

    const res = await POST(
      buildRequest(
        { email: '  Jane@Example.COM  ', password: 'pw' },
        { 'x-forwarded-for': '1.2.3.4', 'user-agent': 'JestUA' }
      )
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user).toEqual(fakeUser);
    expect(body.token).toMatch(/^[0-9a-f-]+-\d+$/i);

    // Email lowercased & trimmed.
    expect(mockClient.rpc).toHaveBeenCalledWith('authenticate_company_user', {
      p_email: 'jane@example.com',
      p_password: 'pw',
    });

    // Session insert payload
    const sessions = mockClient._tableBuilders.company_user_sessions;
    expect(sessions.insert).toHaveBeenCalledTimes(1);
    const payload = sessions.insert.mock.calls[0][0];
    expect(payload.user_id).toBe(fakeUser.id);
    expect(payload.company_id).toBe(fakeUser.company_id);
    expect(payload.ip_address).toBe('1.2.3.4');

    // log_activity was called fire-and-forget.
    expect(mockClient.rpc).toHaveBeenCalledWith(
      'log_activity',
      expect.objectContaining({
        p_company_id: fakeUser.company_id,
        p_user_id: fakeUser.id,
        p_action: 'user_login',
      })
    );

    // Cookie has HttpOnly.
    const cookie = res.headers.get('set-cookie');
    expect(cookie).toMatch(/^company_session=/);
    expect(cookie).toContain('HttpOnly');
  });

  test('login still succeeds even if log_activity throws', async () => {
    mockClient = createMockSupabaseClient({
      rpc: {
        authenticate_company_user: {
          data: { success: true, user: fakeUser },
          error: null,
        },
      },
    });
    // Override rpc to throw on log_activity.
    const originalRpc = mockClient.rpc;
    mockClient.rpc = jest.fn((fnName, args) => {
      if (fnName === 'log_activity') return Promise.reject(new Error('logger down'));
      return originalRpc(fnName, args);
    });

    const { POST } = require('./route');
    const res = await POST(buildRequest({ email: 'a@b.com', password: 'x' }));

    expect(res.status).toBe(200);
    expect(consoleWarnSpy).toHaveBeenCalled();
  });
});
