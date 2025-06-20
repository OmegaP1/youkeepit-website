// src/app/company/components/dashboard/DashboardOverview.js
'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Users,
  Smartphone,
  TrendingUp,
  Eye,
  Download,
  Clock,
  Building,
  BarChart3,
  Activity,
  ExternalLink,
} from 'lucide-react';
import StatCard from '../ui/StatCard';
import OfferStatusBadge from '../ui/OfferStatusBadge';

export default function DashboardOverview({ showMessage, onTabChange }) {
  const [mounted, setMounted] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample data - replace with real API calls
  const stats = [
    {
      title: 'Total Revenue',
      value: 125680,
      change: 12.5,
      icon: DollarSign,
      trend: 'up',
      format: 'currency',
      color: 'green',
    },
    {
      title: 'Active Offers',
      value: 48,
      change: 8.2,
      icon: Smartphone,
      trend: 'up',
      format: 'number',
      color: 'blue',
    },
    {
      title: 'Employees',
      value: 156,
      change: 5.1,
      icon: Users,
      trend: 'up',
      format: 'number',
      color: 'purple',
    },
    {
      title: 'Conversion Rate',
      value: 68.5,
      change: -2.1,
      icon: TrendingUp,
      trend: 'down',
      format: 'percentage',
      color: 'orange',
    },
  ];

  const recentOffers = [
    {
      id: '#OF-001',
      employee: 'Sarah Johnson',
      device: 'iPhone 14 Pro',
      price: '$899',
      status: 'active',
      created: '2 hours ago',
      link: 'https://app.company.com/offers/of-001',
    },
    {
      id: '#OF-002',
      employee: 'Mike Chen',
      device: 'Samsung Galaxy S24',
      price: '$749',
      status: 'pending',
      created: '4 hours ago',
      link: 'https://app.company.com/offers/of-002',
    },
    {
      id: '#OF-003',
      employee: 'Emily Davis',
      device: 'iPad Air',
      price: '$599',
      status: 'completed',
      created: '1 day ago',
      link: 'https://app.company.com/offers/of-003',
    },
    {
      id: '#OF-004',
      employee: 'James Wilson',
      device: 'MacBook Pro 13"',
      price: '$1299',
      status: 'active',
      created: '2 days ago',
      link: 'https://app.company.com/offers/of-004',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Offer',
      description: 'Set up a device sale offer for an employee',
      icon: Plus,
      color: 'bg-blue-500',
      action: () => {
        if (onTabChange) {
          onTabChange('offers');
          showMessage &&
            showMessage(
              'Navigated to Offers - Click "Create New Offer" to start',
              'success'
            );
        }
      },
    },
    {
      title: 'View Reports',
      description: 'Access detailed analytics and insights',
      icon: BarChart3,
      color: 'bg-purple-500',
      action: () => {
        if (onTabChange) {
          onTabChange('reports');
          showMessage && showMessage('Navigated to Reports section', 'success');
        } else {
          showMessage && showMessage('Reports section coming soon!', 'info');
        }
      },
    },
    {
      title: 'Manage Employees',
      description: 'Add or update employee information',
      icon: Users,
      color: 'bg-green-500',
      action: () => {
        if (onTabChange) {
          onTabChange('employees');
          showMessage &&
            showMessage('Navigated to Employee Management', 'success');
        }
      },
    },
  ];

  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = value => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPercentage = value => {
    return `${value}%`;
  };

  const handleViewAllOffers = () => {
    if (onTabChange) {
      onTabChange('offers');
      showMessage && showMessage('Viewing all offers', 'success');
    }
  };

  const handleViewOffer = offerId => {
    if (onTabChange) {
      onTabChange('offers');
      showMessage && showMessage(`Viewing offer ${offerId}`, 'success');
    }
  };

  const copyOfferLink = (link, offerId) => {
    navigator.clipboard.writeText(link);
    showMessage &&
      showMessage(`Offer link ${offerId} copied to clipboard!`, 'success');
  };

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your company.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={e => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={() =>
              showMessage && showMessage('Refreshing dashboard...', 'info')
            }
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            title="Refresh"
          >
            <Activity className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Offers */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Offers</h3>
              <button
                onClick={handleViewAllOffers}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <span>View all</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentOffers.map((offer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{offer.id}</p>
                      <p className="text-sm text-gray-600">{offer.employee}</p>
                      <p className="text-xs text-gray-500">
                        {offer.device} • {offer.created}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {offer.price}
                      </p>
                      <OfferStatusBadge status={offer.status} />
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => copyOfferLink(offer.link, offer.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-xl transition-all duration-200"
                        title="Copy link"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleViewOffer(offer.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {action.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {action.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Operational
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Healthy
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Service</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Online
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Quick Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button
          onClick={() => {
            if (onTabChange) {
              onTabChange('offers');
              showMessage && showMessage('Quick access to offers', 'success');
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}