// src/app/company/components/ui/StatCard.js
'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  format = 'number',
  color = 'blue',
}) {
  const formatValue = (val, fmt) => {
    switch (fmt) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getColorClasses = colorName => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        lightBg: 'bg-blue-50',
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600',
        lightBg: 'bg-green-50',
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        lightBg: 'bg-purple-50',
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        lightBg: 'bg-orange-50',
      },
      red: {
        bg: 'bg-red-500',
        text: 'text-red-600',
        lightBg: 'bg-red-50',
      },
    };
    return colors[colorName] || colors.blue;
  };

  const colorClasses = getColorClasses(color);
  const isPositive = trend === 'up';
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatValue(value, format)}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <TrendIcon className={`w-4 h-4 mr-1 ${changeColor}`} />
              <span className={`text-sm font-medium ${changeColor}`}>
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses.lightBg}`}>
          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
        </div>
      </div>
    </div>
  );
}