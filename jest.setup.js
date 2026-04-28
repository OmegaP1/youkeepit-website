// jest.setup.js — runs after each test environment is set up.
// Adds @testing-library/jest-dom matchers (toBeInTheDocument, toHaveClass, …).
require('@testing-library/jest-dom');

// Default env vars expected by lib/supabase.js. Real values are not needed
// because the Supabase client is mocked in tests; we just need them to exist
// so the module's "missing env" guard doesn't throw at import time.
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'test-service-key';

// jsdom doesn't implement matchMedia; some components call it during render.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
