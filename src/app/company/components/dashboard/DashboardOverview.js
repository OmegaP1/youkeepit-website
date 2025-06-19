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
} from 'lucide-react';
import StatCard from '../ui/StatCard';
import OfferStatusBadge from '../ui/OfferStatusBadge';

export default function DashboardOverview({ showMessage, onNavigateToOffers }) {
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
      action: () => onNavigateToOffers && onNavigateToOffers(),
    },
    {
      title: 'View Reports',
      description: 'Access detailed analytics and insights',
      icon: BarChart3,
      color: 'bg-purple-500',
      action: () =>
        showMessage && showMessage('Reports section coming soon!', 'info'),
    },
    {
      title: 'Manage Employees',
      description: 'Add or update employee information',
      icon: Users,
      color: 'bg-green-500',
      action: () =>
        showMessage && showMessage('Employee management coming soon!', 'info'),
    },
  ];

  const copyToClipboard = async (text, type = 'Link') => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage && showMessage(`${type} copied to clipboard!`, 'success');
    } catch (err) {
      showMessage &&
        showMessage(`Failed to copy ${type.toLowerCase()}`, 'error');
    }
  };

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
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
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex-1 mb-6 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              Here's your company overview for today.
            </p>
            <div className="flex items-center space-x-4 text-sm text-blue-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <button
              onClick={() => {
                if (onNavigateToOffers) {
                  onNavigateToOffers();
                } else {
                  showMessage &&
                    showMessage('Redirecting to create offer...', 'info');
                }
              }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              <span>Create New Offer</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Offers */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Offers
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Latest device sale offers
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToOffers && onNavigateToOffers()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm flex items-center space-x-2"
                >
                  <span>View All</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {recentOffers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-semibold text-gray-900">
                            {offer.id}
                          </span>
                          <OfferStatusBadge status={offer.status} size="sm" />
                        </div>
                        <p className="text-gray-700 font-medium">
                          {offer.employee}
                        </p>
                        <p className="text-sm text-gray-600">{offer.device}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span className="font-semibold text-green-600">
                              {offer.price}
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{offer.created}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyToClipboard(offer.link)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200"
                        title="Copy link"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          showMessage &&
                          showMessage(`Viewing offer ${offer.id}`, 'info')
                        }
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
          onClick={() => onNavigateToOffers && onNavigateToOffers()}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}