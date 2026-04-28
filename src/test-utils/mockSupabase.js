// src/test-utils/mockSupabase.js
// Builders for testing code that uses @supabase/supabase-js. Each test file
// jest.mock()s '@supabase/supabase-js' and uses these helpers to assemble a
// fake client whose query chains and rpc() return whatever the test needs.

/**
 * Build a chainable query-builder mock. Every method (select, eq, insert,
 * update, delete, order, gt, single, …) returns the same object so chains
 * resolve. The chain itself is a thenable that resolves to `result` when
 * awaited (for non-.single() calls).
 *
 * For `.single()` style queries, pass `single: result` so the chain
 * resolves the .single() call to that value instead.
 */
function buildQueryBuilder({ result = { data: null, error: null }, single } = {}) {
  const passthrough = ['select', 'eq', 'gt', 'lt', 'gte', 'lte', 'order', 'limit', 'neq', 'in'];

  const chain = {};

  for (const method of passthrough) {
    chain[method] = jest.fn(() => chain);
  }

  // Terminal methods — they return promises (or thenable chains).
  chain.single = jest.fn(() => Promise.resolve(single ?? result));
  chain.maybeSingle = jest.fn(() => Promise.resolve(single ?? result));

  // insert/update/delete/upsert can be either chained further (e.g. .select())
  // or awaited directly. Make them return the chain itself, but also be
  // thenable so awaiting the bare insert works.
  for (const method of ['insert', 'update', 'delete', 'upsert']) {
    chain[method] = jest.fn(() => chain);
  }

  // Make the chain itself awaitable.
  chain.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject);

  return chain;
}

/**
 * Create a fake Supabase client.
 *
 * Usage in a test:
 *   const client = createMockSupabaseClient({
 *     rpc: { authenticate_admin: { data: { success: true, user: {...} } } },
 *     tables: {
 *       admin_sessions: { result: { data: null, error: null } },
 *     },
 *   });
 *
 * Then jest.mock('@supabase/supabase-js', () => ({
 *   createClient: jest.fn(() => client),
 * }));
 */
function createMockSupabaseClient({ rpc = {}, tables = {} } = {}) {
  const tableBuilders = {};

  return {
    from: jest.fn((tableName) => {
      if (!tableBuilders[tableName]) {
        tableBuilders[tableName] = buildQueryBuilder(tables[tableName] || {});
      }
      return tableBuilders[tableName];
    }),
    rpc: jest.fn((fnName, _args) => {
      const stub = rpc[fnName];
      if (stub === undefined) {
        return Promise.resolve({ data: null, error: { message: `unstubbed rpc: ${fnName}` } });
      }
      return Promise.resolve(stub);
    }),
    // Expose internals so tests can assert on call counts.
    _tableBuilders: tableBuilders,
  };
}

module.exports = { createMockSupabaseClient, buildQueryBuilder };
