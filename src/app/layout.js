import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'YouKeepIt - Streamline IT Equipment Transitions',
  description: 'Transform how your company handles employee departures and equipment upgrades. Create value from old devices while ensuring smooth, secure transitions.',
  keywords: 'IT equipment, asset management, employee transitions, device marketplace, corporate IT',
  authors: [{ name: 'YouKeepIt Team' }],
  creator: 'YouKeepIt',
  publisher: 'YouKeepIt',
  openGraph: {
    title: 'YouKeepIt - Streamline IT Equipment Transitions',
    description: 'Transform how your company handles employee departures and equipment upgrades.',
    url: 'https://youkeepit.com',
    siteName: 'YouKeepIt',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouKeepIt - Streamline IT Equipment Transitions',
    description: 'Transform how your company handles employee departures and equipment upgrades.',
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
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}