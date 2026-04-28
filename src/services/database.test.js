/**
 * @jest-environment node
 */
// src/services/database.test.js
import { createMockSupabaseClient } from '@/test-utils/mockSupabase';

let mockClient;
jest.mock('@/lib/supabase', () => ({
  // The route code imports `supabase` (not createAdminClient) for these reads.
  get supabase() {
    return mockClient;
  },
}));

let consoleErrorSpy;
beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  consoleErrorSpy.mockRestore();
  jest.clearAllMocks();
});

describe('DatabaseService.getFeatures', () => {
  test('returns rows on success', async () => {
    mockClient = createMockSupabaseClient({
      tables: {
        features: { result: { data: [{ id: 1, title: 'a' }], error: null } },
      },
    });
    const { DatabaseService } = require('./database');

    const features = await DatabaseService.getFeatures();

    expect(features).toEqual([{ id: 1, title: 'a' }]);
    const builder = mockClient._tableBuilders.features;
    expect(builder.select).toHaveBeenCalledWith('*');
    expect(builder.eq).toHaveBeenCalledWith('is_active', true);
    expect(builder.order).toHaveBeenCalledWith('order_index', { ascending: true });
  });

  test('returns empty array (not throws) when supabase errors', async () => {
    mockClient = createMockSupabaseClient({
      tables: {
        features: { result: { data: null, error: { message: 'db down' } } },
      },
    });
    const { DatabaseService } = require('./database');

    const features = await DatabaseService.getFeatures();

    expect(features).toEqual([]);
    // Failure was logged but didn't bubble.
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe('DatabaseService.deleteFeature (soft delete contract)', () => {
  test('marks the row inactive instead of deleting it', async () => {
    mockClient = createMockSupabaseClient({
      tables: { features: { result: { data: null, error: null } } },
    });
    const { DatabaseService } = require('./database');

    await DatabaseService.deleteFeature(42);

    const builder = mockClient._tableBuilders.features;
    expect(builder.update).toHaveBeenCalledWith({ is_active: false });
    expect(builder.eq).toHaveBeenCalledWith('id', 42);
    // Critical: never calls .delete() — that would be a hard delete.
    expect(builder.delete).not.toHaveBeenCalled();
  });
});

describe('DatabaseService.updateFeature', () => {
  test('stamps updated_at and returns first row', async () => {
    const fixedNow = new Date('2026-04-28T12:00:00Z');
    jest.useFakeTimers().setSystemTime(fixedNow);

    mockClient = createMockSupabaseClient({
      tables: {
        features: {
          result: { data: [{ id: 1, title: 'updated' }], error: null },
        },
      },
    });
    const { DatabaseService } = require('./database');

    const result = await DatabaseService.updateFeature(1, { title: 'updated' });

    expect(result).toEqual({ id: 1, title: 'updated' });
    const builder = mockClient._tableBuilders.features;
    const updateArg = builder.update.mock.calls[0][0];
    expect(updateArg.title).toBe('updated');
    expect(updateArg.updated_at).toBe(fixedNow.toISOString());
    expect(builder.eq).toHaveBeenCalledWith('id', 1);

    jest.useRealTimers();
  });
});
