'use client'

import React from 'react'
import { ArrowRight, Play, Users, Shield, TrendingUp } from 'lucide-react'

const Hero = ({ darkMode }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section 
      id="home" 
      className={`pt-24 pb-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-6xl font-bold leading-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Streamline Your
                <span className="text-blue-600 block">IT Equipment</span>
                Transitions
              </h1>
              <p className={`text-xl leading-relaxed max-w-2xl ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Transform how your company handles employee departures and equipment upgrades. 
                Create value from old devices while ensuring smooth, secure transitions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 group"
              >
                Request Demo
                <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className={`border-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  87%
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Cost Reduction
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  24hrs
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Setup Time
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  500+
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Companies
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="relative animate-slide-in-right">
            <div className={`relative z-10 p-8 rounded-2xl backdrop-blur-lg ${
              darkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/60 border border-white/20'
            } shadow-2xl`}>
              <div className="space-y-6">
                <FeatureCard
                  icon={Users}
                  iconColor="bg-blue-600"
                  title="Employee Marketplace"
                  description="Discounted devices for staff"
                  darkMode={darkMode}
                />
                
                <FeatureCard
                  icon={Shield}
                  iconColor="bg-green-600"
                  title="Secure Transitions"
                  description="Data wiping & compliance"
                  darkMode={darkMode}
                />

                <FeatureCard
                  icon={TrendingUp}
                  iconColor="bg-purple-600"
                  title="Asset Recovery"
                  description="Maximize equipment value"
                  darkMode={darkMode}
                />
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Card Component
const FeatureCard = ({ icon: Icon, iconColor, title, description, darkMode }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </div>
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </div>
    </div>
  </div>
)

export default Hero