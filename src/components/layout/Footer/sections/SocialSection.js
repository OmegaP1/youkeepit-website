// src/components/layout/Footer/sections/SocialSection.js
'use client'

import React from 'react'
import SocialIcon from '../components/SocialIcon'

const SocialSection = () => {
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/youkeepit',
      icon: 'twitter',
      color: 'hover:text-blue-400 hover:bg-blue-400/10',
      followers: '12K'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/youkeepit',
      icon: 'linkedin',
      color: 'hover:text-blue-600 hover:bg-blue-600/10',
      followers: '8K'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/youkeepit',
      icon: 'github',
      color: 'hover:text-gray-300 hover:bg-gray-300/10',
      followers: '2K'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@youkeepit',
      icon: 'youtube',
      color: 'hover:text-red-500 hover:bg-red-500/10',
      followers: '5K'
    }
  ]

  return (
    <div className="space-y-6">
      <h4 className="text-white font-semibold text-lg flex items-center">
        <span className="mr-2">🌐</span>
        Follow Us
      </h4>
      
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social) => (
          <SocialIcon 
            key={social.name}
            social={social}
          />
        ))}
      </div>
      
      {/* Social Proof */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-gray-400 text-xs">
          Join <span className="text-blue-300 font-semibold">27K+</span> followers
        </p>
      </div>
    </div>
  )
}

export default SocialSection