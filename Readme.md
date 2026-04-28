![CI](https://github.com/OmegaP1/youkeepit-website/actions/workflows/ci.yml/badge.svg)

# 📂 Next.js 14 Project File Structure

## 🏗️ Project Overview
Modern Next.js 14 application with App Router, featuring a main landing site and separate company admin portal.

```
src/
├── app/                          # Next.js 14 App Router
│   ├── layout.js                 # ✅ Root layout (fixed hydration)
│   ├── page.js                   # ✅ Home page
│   ├── loading.js                # Global loading UI
│   ├── error.js                  # Global error UI
│   ├── not-found.js              # 404 page
│   ├── globals.css               # ✅ Global styles (enhanced)
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
│   │   └── components/
│   │       └── layout/
│   │           ├── AdminLayout.js    # ✅ Admin layout component
│   │           ├── AdminHeader.js    # Admin header
│   │           └── AdminSidebar.js   # Admin sidebar
│   │
│   ├── company/                  # ✅ Company Portal Routes
│   │   ├── layout.js             # ✅ Company layout (fixed)
│   │   ├── page.js               # ✅ Company main page (fixed hydration)
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── CompanyLayout.js      # ✅ Company layout component (fixed)
│   │       │   ├── CompanyHeader.js      # ✅ Company header (fixed)
│   │       │   └── CompanySidebar.js     # ✅ Company sidebar (fixed)
│   │       ├── dashboard/
│   │       │   └── DashboardOverview.js  # Dashboard overview component
│   │       ├── offers/
│   │       │   └── OffersManager.js      # Offers management
│   │       ├── employees/
│   │       │   └── EmployeesManager.js   # Employee management
│   │       ├── devices/
│   │       │   └── DevicesManager.js     # Device management
│   │       ├── transactions/
│   │       │   └── TransactionsManager.js # Transaction management
│   │       ├── reports/
│   │       │   └── ReportsManager.js     # Reports management
│   │       ├── settings/
│   │       │   └── SettingsManager.js    # Settings management
│   │       └── ui/
│   │           ├── LoadingScreen.js      # Loading component
│   │           ├── MessageAlert.js       # Message alert component
│   │           ├── StatCard.js           # Statistics card
│   │           └── OfferStatusBadge.js   # Offer status badge
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
│   │   ├── Header.js             # ✅ Main site header
│   │   ├── Footer.js             # ✅ Main site footer
│   │   ├── Sidebar.js
│   │   ├── Navigation.js         # ✅ Navigation component
│   │   └── AdminLayout.js
│   │
│   ├── sections/                 # ✅ Page sections
│   │   ├── Hero.js               # Hero section
│   │   ├── Problem.js            # Problem section
│   │   ├── HowItWorks.js         # How it works section
│   │   ├── Benefits.js           # Benefits section
│   │   ├── Features.js           # Features section
│   │   ├── Testimonials.js       # Testimonials section
│   │   ├── Pricing.js            # Pricing section
│   │   └── FAQ.js                # FAQ section
│   │
│   ├── backgrounds/              # ✅ Background components
│   │   ├── index.js              # Export file
│   │   ├── GeometricPattern.js   # Geometric patterns
│   │   ├── WavePattern.js        # Wave patterns
│   │   ├── ParticleField.js      # Particle animations
│   │   ├── GradientMesh.js       # Gradient meshes
│   │   ├── CircuitPattern.js     # Circuit patterns
│   │   └── CodeMatrix.js         # Code matrix effect
│   │
│   ├── company/                  # ✅ Company-specific components
│   │   ├── CompanyAuth.js        # ✅ Company authentication
│   │   └── CompanyDashboard.js   # ✅ Company dashboard (fixed)
│   │
│   ├── common/                   # ✅ Common components
│   │   └── ErrorBoundary.js      # ✅ Error boundary component
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
├── hooks/                        # ✅ Custom React hooks
│   ├── useCompanyAuth.js         # ✅ Company authentication hook (fixed)
│   ├── useMessage.js             # ✅ Message state hook
│   ├── useConstants.js           # ✅ Constants hook
│   └── useLocalStorage.js        # Local storage hook
│
├── lib/                          # Library and utility functions
│   ├── supabase.js               # Supabase client configuration
│   ├── auth.js                   # Authentication utilities
│   ├── encryption.js             # Encryption/decryption utilities
│   ├── validation.js             # Input validation schemas
│   ├── rate-limiting.js          # Rate limiting utilities
│   ├── security.js               # Security utilities
│   ├── analytics.js              # Analytics integration
│   └── email.js                  # Email service integration
│
├── utils/                        # ✅ Utility functions
│   ├── constants.js              # Application constants
│   ├── helpers.js                # Helper functions
│   ├── formatters.js             # Data formatting utilities
│   ├── validators.js             # Validation utilities
│   ├── api.js                    # API utilities
│   ├── supabase-client.js        # ✅ Supabase client setup
│   └── database.js               # Database utilities
│
├── services/                     # ✅ Service layer
│   ├── api.js                    # API service
│   ├── auth.js                   # Authentication service
│   ├── database.js               # Database service
│   ├── email.js                  # Email service
│   └── analytics.js              # Analytics service
│
├── contexts/                     # React contexts
│   ├── AuthContext.js            # Authentication context
│   ├── ThemeContext.js           # Theme context
│   └── CompanyContext.js         # Company context
│
├── styles/                       # Additional styles
│   ├── components.css            # Component-specific styles
│   └── utilities.css             # Utility classes
│
└── types/                        # TypeScript type definitions
    ├── auth.ts                   # Authentication types
    ├── api.ts                    # API types
    └── database.ts               # Database types

# API Routes
src/app/api/                      # API routes
├── auth/
│   └── route.js                  # Authentication endpoints
├── admin/
│   ├── users/
│   │   └── route.js              # User management API
│   └── settings/
│       └── route.js              # Settings API
├── company/                      # ✅ Company API routes
│   ├── offers/
│   │   └── route.js              # Offers API
│   ├── employees/
│   │   └── route.js              # Employees API
│   ├── devices/
│   │   └── route.js              # Devices API
│   ├── transactions/
│   │   └── route.js              # Transactions API
│   ├── reports/
│   │   └── route.js              # Reports API
│   └── settings/
│       └── route.js              # Company settings API
└── health/
    └── route.js                  # Health check endpoint
```

## 🔧 Configuration Files

```
├── .env.local                    # Environment variables (git ignored)
├── .env.example                  # Example environment variables
├── .gitignore                    # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment configuration
└── middleware.js                # Next.js middleware
```

## 📁 Scripts Directory
```
scripts/
├── deploy.sh                    # Deployment script
├── env-check.js                 # Environment validation
├── security-check.js            # Security validation
├── setup.sh                     # Initial setup script
└── cleanup-company-files.sh     # ✅ Company files cleanup
```

## 🌐 Public Directory
```
public/
├── favicon.ico
├── favicon.svg                   # SVG favicon
├── favicon-32x32.png            # 32x32 favicon
├── favicon-16x16.png            # 16x16 favicon
├── logo.png
├── og-image.jpg                  # Open Graph image
├── images/                       # Image assets
├── icons/                        # Icon assets
├── manifest.json                # Web app manifest
├── site.webmanifest             # Site webmanifest
└── safari-pinned-tab.svg        # Safari pinned tab icon
```

## 🔑 Key File Locations

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
- **Services**: `src/services/`

### Security & Auth:
- **Supabase Client**: `src/lib/supabase.js`
- **Authentication**: `src/lib/auth.js`
- **Security Utils**: `src/lib/security.js`
- **Middleware**: `middleware.js` (handles auth, rate limiting)

## 🔥 Recent Fixes Applied

### ✅ Hydration Error Resolution:
- **Root Layout**: Added `suppressHydrationWarning={true}`
- **Company Auth Hook**: Fixed client-side mounting and localStorage access
- **Company Layout**: Removed duplicate HTML structure causing conflicts
- **Component Mounting**: Added proper mounting checks to prevent SSR/client mismatches

### ✅ Layout & Sidebar Issues:
- **Company Header**: Fixed positioning and made properly fixed
- **Company Sidebar**: Fixed positioning with `top-16` for header height
- **Company Layout**: Added proper margins (`marginTop: '64px'`) for fixed header
- **Responsive Design**: Improved sidebar collapse and content adjustment

### ✅ Component Structure:
- **Separation of Concerns**: Clear distinction between main site and company portal
- **Reusable Components**: Shared UI components in `/components/ui/`
- **Feature-Specific**: Organized by feature in respective directories
- **Hooks Organization**: Custom hooks for state management and utilities

## 🎯 Missing Components Checklist

### 🚨 Still Need to Create:
```
src/app/company/components/
├── dashboard/
│   └── DashboardOverview.js          # ⚠️ MISSING - Dashboard overview
├── offers/
│   └── OffersManager.js              # ⚠️ MISSING - Offers management
├── employees/
│   └── EmployeesManager.js           # ⚠️ MISSING - Employee management
├── devices/
│   └── DevicesManager.js             # ⚠️ MISSING - Device management
├── transactions/
│   └── TransactionsManager.js        # ⚠️ MISSING - Transaction management
├── reports/
│   └── ReportsManager.js             # ⚠️ MISSING - Reports management
└── ui/
    ├── MessageAlert.js               # ⚠️ MISSING - Message alert component
    ├── StatCard.js                   # ⚠️ MISSING - Statistics card
    └── OfferStatusBadge.js           # ⚠️ MISSING - Offer status badge
```

### 🚨 API Routes Missing:
```
src/app/api/company/
├── offers/route.js                   # ⚠️ MISSING - Offers API
├── employees/route.js                # ⚠️ MISSING - Employees API
├── devices/route.js                  # ⚠️ MISSING - Devices API
├── transactions/route.js             # ⚠️ MISSING - Transactions API
├── reports/route.js                  # ⚠️ MISSING - Reports API
└── settings/route.js                 # ⚠️ MISSING - Company settings API
```

### 🚨 Utility Files Missing:
```
src/utils/
├── companyConstants.js               # ⚠️ MISSING - Company-specific constants
├── offerHelpers.js                   # ⚠️ MISSING - Offer utility functions
└── deviceHelpers.js                  # ⚠️ MISSING - Device utility functions
```

### 🚨 Service Layer Missing:
```
src/services/
├── database.js                       # ⚠️ MISSING - Database service
├── email.js                          # ⚠️ MISSING - Email service
└── analytics.js                      # ⚠️ MISSING - Analytics service
```

## 📊 Component Status Legend:
- ✅ **Complete & Working** - Component exists and functioning
- 🔧 **Fixed** - Component existed but had issues, now resolved
- ⚠️ **Missing** - Component needs to be created
- 📝 **Needs Update** - Component exists but may need improvements

## 🚀 Next Steps:
1. Create missing company dashboard components
2. Implement API routes for company functionality  
3. Add utility functions for business logic
4. Create service layer for data management
5. Add comprehensive error handling
6. Implement proper loading states
7. Add form validation and submission handlers

## 🔧 Development Commands:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
```

## 📝 Notes:
- All layouts and routing are working correctly
- Hydration errors have been resolved
- Sidebar and margins are functioning properly
- Company portal authentication is implemented
- Main site components are complete
- Focus should be on creating the missing company management componen