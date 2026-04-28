# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next.js dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Run production build
npm run lint             # next lint
npm run lint:fix         # next lint --fix
npm run type-check       # tsc --noEmit (project is mostly .js but checked via allowJs)
npm test                 # Jest
npm run test:watch       # Jest in watch mode
npm run test -- <file>   # Run a single test file
npm run env:check        # Validate required env vars (scripts/env-check.js)
npm run env:pull         # Pull env vars from Vercel into .env.local
npm run pre-deploy       # security-check + type-check + lint + build (gate before deploy)
npm run deploy-safe      # pre-deploy then `vercel --prod`
npm run analyze          # Bundle analyzer (ANALYZE=true next build)
```

Note: `npm run security-check` references `scripts/security-check.js`, which is not present in the repo — `pre-deploy` will fail until it is added or the script is removed from `package.json`.

Database migrations live in `database/migrations/*.sql` and are applied manually via the Supabase SQL Editor (`db:migrate` is just an echo reminder). Seed/migration via app: `POST /admin/migrate` re-imports content from `src/utils/constants.js` into Supabase tables (uses the service role key).

## Stack & Conventions

- **Next.js 14 App Router** with mostly JavaScript files (`.js`), TypeScript configured via `tsconfig.json` with `allowJs: true` for type-checking. New TS files are welcome; the path alias `@/*` → `src/*` is set in both `tsconfig.json` and `jsconfig.json`.
- **Supabase** for data (Postgres + RLS) and admin auth.
- **Tailwind CSS** + framer-motion + lucide-react for UI; `next-themes` is installed but the app currently rolls its own dark mode via `useState` + `localStorage` in `src/app/page.js`.
- **Vercel** for hosting (`@vercel/analytics`, `@vercel/speed-insights` wired into `src/app/layout.js`).

Note: the actual layout under `src/app/` does **not** match the route-group structure described in `Readme.md`. The real routes are: `/` (marketing site), `/admin` (CMS dashboard), `/login/company`, `/login/employee`, plus `/api/auth/*` and `/admin/{content,migrate}`. Trust the filesystem over the README.

## Architecture

### 1. Public marketing site (`src/app/page.js`)
Single client-rendered home page that composes section components from `src/components/sections/` (`Hero`, `Problem`, `HowItWorks`, `Benefits`, `Features`, `Pricing`, `FAQ`) inside `Header` + `Footer` from `src/components/layout/`. Dark mode is a `useState` flag passed down as a `darkMode` prop to every section.

### 2. CMS-style admin (`src/app/admin/`)
The marketing site's content is editable through a tabbed admin dashboard. Flow:

- `src/app/admin/page.js` is a client component that gates the dashboard behind `SecureAdminLogin` (`src/components/admin/`). Auth state is mirrored in `localStorage` via `AuthStore` in `src/services/auth.service.js` and validated against the server every mount.
- Once authenticated, `AdminDashboard` switches between **Manager** components — one per content type — under `src/app/admin/components/<domain>/`: `content`, `features`, `testimonials`, `pricing`, `faq`, `navigation`, `stats`, `problem`, `howitworks`, `benefits`.
- All content reads/writes go through `DatabaseService` (`src/services/database.js`), a static class with `getX/createX/updateX/deleteX` methods per table. **Deletes are soft** (`update({ is_active: false })`); list queries always filter `is_active = true` and order by `order_index`.
- The marketing-site sections fetch the same data via `useContentData` (`src/hooks/useContentData.js`), which parallel-loads everything through `DatabaseService` and reshapes `site_content` rows into a nested `{ section: { key: { value, type } } }` object.

When adding a new editable content type, the pattern is: SQL migration in `database/migrations/` → CRUD methods in `DatabaseService` → Manager component under `src/app/admin/components/<domain>/` → register the tab in `AdminDashboard.js` → consume via `useContentData` in the public section.

### 3. Authentication (`src/app/api/auth/*` + `src/services/auth.service.js`)

- `POST /api/auth/login` calls a Supabase RPC `authenticate_admin(p_username, p_password)` using the **service role key** (server-only), generates a session token (`crypto.randomUUID() + '-' + Date.now()`), inserts a row into `admin_sessions`, and returns it as an `HttpOnly; Secure; SameSite=Strict` `admin_session` cookie (24h).
- `GET /api/auth/validate` and `POST /api/auth/logout` round out the lifecycle.
- `AuthStore` keeps a non-authoritative copy of the user in `localStorage` for fast UI gating; **the cookie + server validation is the source of truth**. Don't trust `AuthStore` alone for security decisions.
- The Supabase client in `src/lib/supabase.js` exports both an anon-key public `supabase` (with `persistSession: false`) and a server-only `createAdminClient()` factory that throws if called in the browser. API routes that need elevated access instantiate their own admin client directly with `SUPABASE_SERVICE_ROLE_KEY`.

### 4. Middleware & security headers
- `src/middleware.js` matches `/admin/:path*` and `/api/admin/:path*`, adding no-cache + frame-deny + nosniff headers and CORS for admin APIs. **It does not actually verify the session cookie** — auth is enforced inside the API route handlers and the `/admin` page component, not in middleware.
- `next.config.js` layers global security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`), stricter `DENY` + no-cache headers for `/admin/*` and `/api/admin/*`, an HTTP→HTTPS redirect in production, and disables `poweredByHeader`.

### 5. Environment
Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXTAUTH_SECRET` (≥32 chars), `SESSION_SECRET` (≥32 chars). See `.env.example` and `scripts/env-check.js` for the full list and validation rules. The service role key must never be referenced in code that ships to the client — webpack fallbacks in `next.config.js` already null out `fs/net/tls/crypto` on the client bundle as defense in depth.

## Database

Schema lives in `database/migrations/001_initial_setup.sql` (+ `002_seed_data.sql`, `003_add_new_sections.sql`). Core tables: `site_content`, `features`, `testimonials`, `pricing_plans`, `faq_items`, `navigation_items`, `company_stats`, `problem_stats`, `howitworks_steps`, `benefits`, plus `admin_users` / `admin_sessions` for auth. All editable content tables share the convention: `id`, `order_index`, `is_active`, `created_at`, `updated_at`. RLS is expected to be enabled — when adding tables, mirror the existing policy structure rather than relying on key-based access alone.
