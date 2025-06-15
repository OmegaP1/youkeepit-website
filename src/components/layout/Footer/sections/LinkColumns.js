// src/components/layout/Footer/sections/LinkColumns.js
'use client'

import React from 'react'
import LinkColumn from '../components/LinkColumn'

const LinkColumns = () => {
  const footerLinks = {
    product: {
      title: 'Product',
      icon: '🚀',
      links: [
        { label: 'Features', href: '#features', badge: 'New' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Security', href: '/security', badge: 'SOC 2' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'API Docs', href: '/api-docs' }
      ]
    },
    company: {
      title: 'Company',
      icon: '🏢',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers', badge: 'Hiring' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    support: {
      title: 'Support',
      icon: '💬',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Community', href: '/community' },
        { label: 'Status Page', href: '/status' },
        { label: 'Submit Ticket', href: '/support' }
      ]
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {Object.entries(footerLinks).map(([key, section]) => (
        <LinkColumn 
          key={key} 
          title={section.title}
          icon={section.icon}
          links={section.links}
        />
      ))}
    </div>
  )
}

export default LinkColumns