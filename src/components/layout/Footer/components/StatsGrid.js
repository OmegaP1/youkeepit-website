// src/components/layout/Footer/components/StatsGrid.js
'use client'

import React from 'react'

const StatsGrid = () => {
  const stats = [
    { value: '500+', label: 'Companies', color: 'text-blue-400' },
    { value: '87%', label: 'Cost Reduction', color: 'text-green-400' },
    { value: '24hrs', label: 'Setup Time', color: 'text-purple-400' }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center group">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-gray-400 text-xs font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid