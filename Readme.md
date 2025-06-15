# 📂 Next.js 14 Project File Structure

```
src/
├── app/                          # Next.js 14 App Router
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   ├── loading.js                # Global loading UI
│   ├── error.js                  # Global error UI
│   ├── not-found.js              # 404 page
│   ├── globals.css               # Global styles
│   │
│   ├── (auth)/                   # Route group for auth
│   │   ├── login/
│   │   │   └── page.js           # Login page
│   │   ├── register/
│   │   │   └── page.js           # Register page
│   │   └── layout.js             # Auth layout
│   │
│   ├── admin/                    # Admin routes
│   │   ├── layout.js             # Admin layout
│   │   ├── page.js               # Admin dashboard
│   │   ├── loading.js            # Admin loading
│   │   ├── users/
│   │   │   ├── page.js           # Users management
│   │   │   ├── [id]/
│   │   │   │   └── page.js       # User details
│   │   │   └── components/
│   │   │       ├── UserTable.js
│   │   │       ├── UserForm.js
│   │   │       └── UserFilters.js
│   │   └── settings/
│   │       └── page.js           # Admin settings
│   │
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── route.js          # Authentication endpoints
│   │   ├── admin/
│   │   │   ├── users/
│   │   │   │   └── route.js      # User management API
│   │   │   └── settings/
│   │   │       └── route.js      # Settings API
│   │   └── health/
│   │       └── route.js          # Health check endpoint
│   │
│   └── (public)/                 # Public routes
│       ├── about/
│       │   └── page.js           # About page
│       ├── contact/
│       │   └── page.js           # Contact page
│       └── privacy/
│           └── page.js           # Privacy policy
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Modal.js
│   │   ├── Toast.js
│   │   ├── Loading.js
│   │   ├── Card.js
│   │   └── Table.js
│   │
│   ├── forms/                    # Form components
│   │   ├── AuthForm.js
│   │   ├── ContactForm.js
│   │   └── SettingsForm.js
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Sidebar.js
│   │   ├── Navigation.js
│   │   └── AdminLayout.js
│   │
│   └── features/                 # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.js
│       │   ├── RegisterForm.js
│       │   └── AuthProvider.js
│       │
│       ├── admin/
│       │   ├── Dashboard.js
│       │   ├── UserManagement.js
│       │   └── SecuritySettings.js
│       │
│       └── public/
│           ├── Hero.js
│           ├── Features.js
│           └── CTA.js
│
├── lib/                          # Library and utility functions
│   ├── supabase.js               # Supabase client configuration
│   ├── auth.js                   # Authentication utilities
│   ├── encryption.js             # Encryption/decryption utilities
│   ├── validation.js             # Input validation schemas
│   ├── rate-limiter.js           # Rate limiting implementation
│   ├── security.js               # Security utilities
│   └── constants.js              # Application constants
│
├── utils/                        # Helper utilities
│   ├── supabase-client.js        # Client-side Supabase
│   ├── api-helpers.js            # API utility functions
│   ├── form-helpers.js           # Form handling utilities
│   ├── date-helpers.js           # Date formatting utilities
│   ├── string-helpers.js         # String manipulation
│   └── validation-helpers.js     # Validation helpers
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.js                # Authentication hook
│   ├── useLocalStorage.js        # Local storage hook
│   ├── useApi.js                 # API calls hook
│   ├── useForm.js                # Form handling hook
│   └── useDebounce.js            # Debounce hook
│
├── contexts/                     # React contexts
│   ├── AuthContext.js            # Authentication context
│   ├── ThemeContext.js           # Theme context
│   └── AdminContext.js           # Admin context
│
├── middleware.js                 # Next.js middleware (root level)
├── types/                        # TypeScript type definitions
│   ├── auth.ts
│   ├── user.ts
│   └── api.ts
│
└── styles/                       # Additional styles
    ├── components.css            # Component-specific styles
    └── utilities.css             # Utility classes

# Root Level Files
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (git ignored)
├── .gitignore                    # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── tsconfig.json                # TypeScript configuration
└── vercel.json                  # Vercel deployment configuration

# Scripts Directory
scripts/
├── deploy.sh                    # Deployment script
├── env-check.js                 # Environment validation
├── security-check.js            # Security validation
└── setup.sh                    # Initial setup script

# Public Directory
public/
├── favicon.ico
├── logo.png
├── images/
├── icons/
└── manifest.json
```

## 🔑 Key File Locations:

### Configuration Files:
- **Environment**: `.env.local`, `.env.example`
- **Next.js Config**: `next.config.js` (root level)
- **Middleware**: `middleware.js` (root level)
- **Tailwind**: `tailwind.config.js` (root level)

### Core Application:
- **App Router**: `src/app/` (Next.js 14 App Router)
- **Components**: `src/components/`
- **Utilities**: `src/lib/` and `src/utils/`
- **Hooks**: `src/hooks/`
- **Contexts**: `src/contexts/`

### Security & Auth:
- **Supabase Client**: `src/lib/supabase.js`
- **Authentication**: `src/lib/auth.js`
- **Security Utils**: `src/lib/security.js`
- **Middleware**: `middleware.js` (handles auth, rate limiting)