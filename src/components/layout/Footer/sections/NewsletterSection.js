// src/components/layout/Footer/sections/NewsletterSection.js
'use client'

import React, { useState } from 'react'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
        <div className="text-green-400 text-3xl mb-3">✅</div>
        <h4 className="text-white font-semibold mb-2">Success!</h4>
        <p className="text-green-300 text-sm">You're subscribed to our newsletter</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
          <span className="mr-2">📧</span>
          Stay Updated
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed">
          Get the latest insights on IT equipment management and industry trends.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Subscribing...</span>
            </div>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      
      <p className="text-xs text-gray-500">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}

export default NewsletterSection