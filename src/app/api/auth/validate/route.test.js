/**
 * @jest-environment node
 */
// src/app/api/auth/validate/route.test.js
import { createMockSupabaseClient } from '@/test-utils/mockSupabase';

let mockClient;
jest.mock('@/lib/supabase', () => ({
  createAdminClient: jest.fn(() => mockClient),
}));

let consoleErrorSpy;
beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  consoleErrorSpy.mockRestore();
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

describe('GET /api/auth/validate', () => {
  test('401 when no session cookie is present', async () => {
    mockClient = createMockSupabaseClient();
    const { GET } = require('./route');

    const res = await GET(buildRequest({}));

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ success: false, message: 'No session token' });
    expect(mockClient.from).not.toHaveBeenCalled();
  });

  test('401 when the session is not found / expired', async () => {
    mockClient = createMockSupabaseClient({
      tables: {
        admin_sessions: {
          single: { data: null, error: { message: 'no rows' } },
        },
      },
    });
    const { GET } = require('./route');

    const res = await GET(buildRequest({ admin_session: 'expired-token' }));

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);

    // Confirm the route filtered by token AND expiry > now.
    const sessions = mockClient._tableBuilders.admin_sessions;
    expect(sessions.eq).toHaveBeenCalledWith('session_token', 'expired-token');
    expect(sessions.gt).toHaveBeenCalledWith(
      'expires_at',
      expect.any(String)
    );
  });

  test('200 when the session is valid', async () => {
    mockClient = createMockSupabaseClient({
      tables: {
        admin_sessions: {
          single: {
            data: { user_id: 'user-1', expires_at: '2099-01-01T00:00:00Z' },
            error: null,
          },
        },
      },
    });
    const { GET } = require('./route');

    const res = await GET(buildRequest({ admin_session: 'valid-token' }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      success: true,
      user: { id: 'user-1' },
    });
  });

  test('500 when the Supabase call throws', async () => {
    mockClient = {
      from: jest.fn(() => {
        throw new Error('boom');
      }),
      rpc: jest.fn(),
    };
    const { GET } = require('./route');

    const res = await GET(buildRequest({ admin_session: 'tok' }));

    expect(res.status).toBe(500);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
