// src/app/company/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Company Admin - KeepMyKit',
  description: 'Company admin panel for managing device sale offers and employee transactions',
};

export default function CompanyLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-gray-50 antialiased">
        <div id="company-root">
          {children}
        </div>
      </body>
    </html>
  );
}