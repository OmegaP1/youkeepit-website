// src/app/company/components/reports/ReportsManager.js
'use client';

import { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Monitor,
} from 'lucide-react';

export default function ReportsManager({ showMessage }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock analytics data
  const analytics = {
    revenue: {
      current: 4280,
      previous: 3510,
      change: 21.9,
    },
    offers: {
      current: 15,
      previous: 12,
      change: 25.0,
    },
    devices: {
      current: 8,
      previous: 7,
      change: 14.3,
    },
    employees: {
      current: 6,
      previous: 5,
      change: 20.0,
    },
  };

  const monthlyData = [
    { month: 'Jan', revenue: 2800, offers: 8 },
    { month: 'Feb', revenue: 3200, offers: 10 },
    { month: 'Mar', revenue: 2900, offers: 9 },
    { month: 'Apr', revenue: 3800, offers: 12 },
    { month: 'May', revenue: 3510, offers: 11 },
    { month: 'Jun', revenue: 4280, offers: 15 },
  ];

  const topDevices = [
    { model: 'MacBook Pro 16"', count: 5, revenue: 4250 },
    { model: 'MacBook Air M2', count: 3, revenue: 2040 },
    { model: 'ThinkPad X1 Carbon', count: 2, revenue: 1040 },
    { model: 'Dell XPS 13', count: 2, revenue: 840 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track performance and generate insights.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={() => showMessage('Export feature coming soon!', 'info')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 shadow-md"
          >
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{analytics.revenue.change}%
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${analytics.revenue.current}
            </p>
            <p className="text-sm text-gray-500">
              vs ${analytics.revenue.previous} last period
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{analytics.offers.change}%
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Offers Created
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.offers.current}
            </p>
            <p className="text-sm text-gray-500">
              vs {analytics.offers.previous} last period
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Monitor className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{analytics.devices.change}%
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Devices Sold
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.devices.current}
            </p>
            <p className="text-sm text-gray-500">
              vs {analytics.devices.previous} last period
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{analytics.employees.change}%
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Active Employees
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.employees.current}
            </p>
            <p className="text-sm text-gray-500">
              vs {analytics.employees.previous} last period
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div
                key={data.month}
                className="flex flex-col items-center space-y-2"
              >
                <div
                  className="bg-primary-500 rounded-t w-8 min-h-[20px] transition-all duration-300 hover:bg-primary-600"
                  style={{ height: `${(data.revenue / 5000) * 200}px` }}
                  title={`${data.revenue}`}
                ></div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Devices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Devices
          </h3>
          <div className="space-y-4">
            {topDevices.map((device, index) => (
              <div
                key={device.model}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{device.model}</p>
                    <p className="text-sm text-gray-600">{device.count} sold</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">
                  ${device.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Detailed Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => showMessage('Generating revenue report...', 'info')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Revenue Report</h4>
            <p className="text-sm text-gray-600">
              Detailed revenue breakdown and analysis
            </p>
          </button>
          <button
            onClick={() => showMessage('Generating device report...', 'info')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Monitor className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Device Report</h4>
            <p className="text-sm text-gray-600">
              Device sales and inventory analysis
            </p>
          </button>
          <button
            onClick={() => showMessage('Generating employee report...', 'info')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Employee Report</h4>
            <p className="text-sm text-gray-600">
              Employee participation and activity
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}