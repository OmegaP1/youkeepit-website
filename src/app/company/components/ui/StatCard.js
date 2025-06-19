// src/app/company/components/ui/StatCard.js
'use client';

import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  trend,
  percentage,
  icon: Icon,
  color,
  gradient,
}) {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          border: 'border-blue-100',
          text: 'text-blue-700',
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          border: 'border-green-100',
          text: 'text-green-700',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          border: 'border-purple-100',
          text: 'text-purple-700',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          icon: 'text-emerald-600',
          border: 'border-emerald-100',
          text: 'text-emerald-700',
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          border: 'border-gray-100',
          text: 'text-gray-700',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-2xl ${colors.bg} ${colors.border} border-2 group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-7 h-7 ${colors.icon}`} />
          </div>

          {trend && (
            <div
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                trend === 'up'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{percentage}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              } flex items-center space-x-1`}
            >
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
