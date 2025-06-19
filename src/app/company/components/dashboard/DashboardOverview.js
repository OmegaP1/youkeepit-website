// src/app/company/components/dashboard/DashboardOverview.js
'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Users,
  Monitor,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Star,
  Calendar,
} from 'lucide-react';
import StatCard from '../ui/StatCard';
import OfferStatusBadge from '../ui/OfferStatusBadge';

export default function DashboardOverview({ showMessage, onNavigateToOffers }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentOffers, setRecentOffers] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    // Simulate loading with realistic data fetching
    const loadDashboardData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStats([
        {
          title: 'Active Offers',
          value: '12',
          change: '+3 this week',
          trend: 'up',
          percentage: '+25%',
          icon: ShoppingBag,
          color: 'blue',
          gradient: 'from-blue-500 to-blue-600',
        },
        {
          title: 'Total Employees',
          value: '45',
          change: '+2 this month',
          trend: 'up',
          percentage: '+4.4%',
          icon: Users,
          color: 'green',
          gradient: 'from-green-500 to-emerald-600',
        },
        {
          title: 'Devices Sold',
          value: '23',
          change: '+8 this month',
          trend: 'up',
          percentage: '+53%',
          icon: Monitor,
          color: 'purple',
          gradient: 'from-purple-500 to-purple-600',
        },
        {
          title: 'Revenue Generated',
          value: '$12,450',
          change: '+15% this month',
          trend: 'up',
          percentage: '+15%',
          icon: DollarSign,
          color: 'emerald',
          gradient: 'from-emerald-500 to-teal-600',
        },
      ]);

      setRecentOffers([
        {
          id: 'OFF-001',
          employee: 'John Smith',
          device: 'MacBook Pro 16" 2022',
          price: '$850',
          status: 'pending_wipe',
          created: '2 hours ago',
          link: 'https://offer.keepmykit.com/off-001',
          avatar: 'JS',
          priority: 'high',
        },
        {
          id: 'OFF-002',
          employee: 'Sarah Johnson',
          device: 'Dell XPS 13',
          price: '$420',
          status: 'wipe_confirmed',
          created: '5 hours ago',
          link: 'https://offer.keepmykit.com/off-002',
          avatar: 'SJ',
          priority: 'medium',
        },
        {
          id: 'OFF-003',
          employee: 'Mike Wilson',
          device: 'ThinkPad X1 Carbon',
          price: '$520',
          status: 'completed',
          created: '1 day ago',
          link: 'https://offer.keepmykit.com/off-003',
          avatar: 'MW',
          priority: 'low',
        },
        {
          id: 'OFF-004',
          employee: 'Emma Davis',
          device: 'MacBook Air M2',
          price: '$680',
          status: 'pending_acceptance',
          created: '2 days ago',
          link: 'https://offer.keepmykit.com/off-004',
          avatar: 'ED',
          priority: 'medium',
        },
      ]);

      setPendingActions([
        {
          id: 1,
          type: 'wipe_confirmation',
          title: 'MacBook Pro requires wipe confirmation',
          description: 'Device needs immediate IT attention',
          employee: 'John Smith',
          urgency: 'high',
          time: '2 hours ago',
          icon: AlertCircle,
          color: 'red',
        },
        {
          id: 2,
          type: 'payment_pending',
          title: 'Payment link sent to employee',
          description: 'Waiting for employee payment completion',
          employee: 'Sarah Johnson',
          urgency: 'medium',
          time: '5 hours ago',
          icon: Clock,
          color: 'orange',
        },
        {
          id: 3,
          type: 'device_handover',
          title: 'Device ready for pickup',
          description: 'Device wiped and ready for collection',
          employee: 'Mike Wilson',
          urgency: 'low',
          time: '1 day ago',
          icon: CheckCircle,
          color: 'green',
        },
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const copyToClipboard = text => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showMessage && showMessage('Link copied to clipboard!', 'success');
    } else {
      showMessage && showMessage('Clipboard not available', 'error');
    }
  };

  const formatTime = timeStr => {
    return timeStr;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading Header */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-96"></div>
        </div>

        {/* Loading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-8 bg-gray-200 rounded"></div>
                <div className="w-20 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-full h-16 bg-gray-200 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center space-x-3">
              <span>Dashboard</span>
              <Zap className="w-8 h-8 text-yellow-300" />
            </h1>
            <p className="text-blue-100 text-lg">
              Welcome back! Here's your company overview for today.
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-blue-100">
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

      {/* Stats Grid with animations */}
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
        {/* Recent Offers - Enhanced Design */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                    <span>Recent Offers</span>
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Latest device sale offers and their status
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                  View All
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {recentOffers.map((offer, index) => (
                <div
                  key={offer.id}
                  className="group bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-2xl p-4 transition-all duration-300 hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                        {offer.avatar}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-bold text-gray-900">
                            {offer.id}
                          </span>
                          <OfferStatusBadge status={offer.status} />
                          {offer.priority === 'high' && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar with Pending Actions and Quick Stats */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50/30">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <span>Pending Actions</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Items requiring your attention
              </p>
            </div>

            <div className="p-6 space-y-4">
              {pendingActions.map((action, index) => {
                const IconComponent = action.icon;
                const urgencyColors = {
                  high: 'border-red-200 bg-red-50',
                  medium: 'border-orange-200 bg-orange-50',
                  low: 'border-green-200 bg-green-50',
                };

                return (
                  <div
                    key={action.id}
                    className={`${urgencyColors[action.urgency]} border-l-4 border-l-${action.color}-400 p-4 rounded-r-xl transition-all duration-300 hover:shadow-md cursor-pointer`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`flex-shrink-0 p-2 bg-${action.color}-100 rounded-xl`}
                      >
                        <IconComponent
                          className={`w-5 h-5 text-${action.color}-600`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                          {action.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {action.description}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs font-medium text-gray-700">
                            Employee: {action.employee}
                          </p>
                          <span className="text-xs text-gray-500">
                            {action.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Performance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-200" />
              <h3 className="text-lg font-bold">This Month</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Offers Created</span>
                <span className="font-bold text-2xl">15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Devices Sold</span>
                <span className="font-bold text-2xl">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Revenue</span>
                <span className="font-bold text-2xl text-green-300">
                  $4,280
                </span>
              </div>
              <div className="pt-4 border-t border-blue-500/30">
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="w-5 h-5 text-green-300" />
                  <span className="font-semibold text-green-300">
                    +23% vs last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
