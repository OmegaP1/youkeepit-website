// src/app/company/components/ui/StatCard.js
'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  format = 'number',
  color = 'blue',
}) {
  const formatValue = val => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return new Intl.NumberFormat('en-US').format(val);
  };

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      trend: trend === 'up' ? 'text-green-600' : 'text-red-600',
    },
    green: {
      gradient: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      icon: 'text-green-600',
      trend: trend === 'up' ? 'text-green-600' : 'text-red-600',
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      trend: trend === 'up' ? 'text-green-600' : 'text-red-600',
    },
    orange: {
      gradient: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      trend: trend === 'up' ? 'text-green-600' : 'text-red-600',
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div
              className={`p-2 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-5 h-5 ${colors.icon}`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>

          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(value)}
            </p>

            {change && (
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${colors.trend}`}>
                  {trend === 'up' ? '+' : ''}
                  {change}%
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
