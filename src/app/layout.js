import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL('https://youkeepit-website.vercel.app'),
  title: {
    default: 'YouKeepIt - Streamline IT Equipment Transitions',
    template: '%s | YouKeepIt',
  },
  description:
    'Transform how your company handles employee departures and equipment upgrades. Create value from old devices while ensuring smooth, secure transitions. Recover 60-80% of device value.',
  keywords: [
    'IT equipment management',
    'asset management',
    'employee transitions',
    'device marketplace',
    'corporate IT',
    'equipment disposal',
    'data wiping',
    'compliance',
    'asset recovery',
    'IT transitions',
    'employee marketplace',
    'refurbished devices',
    'enterprise security',
    'IT workflows',
  ],
  authors: [
    { name: 'YouKeepIt Team', url: 'https://youkeepit-website.vercel.app' },
  ],
  creator: 'YouKeepIt',
  publisher: 'YouKeepIt',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://youkeepit-website.vercel.app',
    siteName: 'YouKeepIt',
    title: 'YouKeepIt - Streamline IT Equipment Transitions',
    description:
      'Transform how your company handles employee departures and equipment upgrades. Recover 60-80% of device value through our secure marketplace platform.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YouKeepIt - IT Equipment Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouKeepIt - Streamline IT Equipment Transitions',
    description:
      'Transform how your company handles employee departures and equipment upgrades. Recover 60-80% of device value.',
    images: ['/og-image.jpg'],
    creator: '@youkeepit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://youkeepit-website.vercel.app',
  },
  category: 'technology',
};

// Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YouKeepIt",
  description: "IT Equipment Transition Management Platform",
  url: "https://youkeepit-website.vercel.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "2999",
    priceCurrency: "USD",
    priceValidUntil: "2025-12-31",
    availability: "https://schema.org/InStock",
  },
  provider: {
    "@type": "Organization",
    name: "YouKeepIt",
    url: "https://youkeepit-website.vercel.app",
    logo: "https://youkeepit-website.vercel.app/favicon.svg",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@youkeepit.com",
    },
  },
  featureList: [
    "Enterprise Security",
    "Employee Portal",
    "Analytics Dashboard",
    "Automated Workflows",
    "Integration Ready",
    "White-Label Option",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <div id="root">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}