// src/app/company/components/dashboard/DashboardOverview.js
'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

import StatCard from '../ui/StatCard';
import RecentOffers from './RecentOffers';
import PendingActions from './PendingActions';
import QuickActions from './QuickActions';

export default function DashboardOverview({ showMessage, onTabChange }) {
  const [stats, setStats] = useState({
    totalOffers: 0,
    activeEmployees: 0,
    totalRevenue: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchStats = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          totalOffers: 42,
          activeEmployees: 15,
          totalRevenue: 87500,
          completionRate: 94.2
        });
      } catch (error) {
        showMessage('Error loading dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [showMessage]);

  const statCards = [
    {
      title: 'Total Offers',
      value: stats.totalOffers,
      change: '+12%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'Active Employees',
      value: stats.activeEmployees,
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Revenue Recovery',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your device offers.</p>
        </div>
        <button
          onClick={() => onTabChange('create-offer')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions onTabChange={onTabChange} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Offers */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Offers</h2>
              <button
                onClick={() => onTabChange('offers')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <RecentOffers onTabChange={onTabChange} />
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Pending Actions</h2>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                5 items
              </span>
            </div>
          </div>
          <PendingActions onTabChange={onTabChange} />
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                icon: CheckCircle,
                color: 'text-green-500',
                title: 'Offer completed',
                description: 'John Smith purchased MacBook Pro for $1,200',
                time: '2 hours ago'
              },
              {
                icon: Clock,
                color: 'text-orange-500',
                title: 'Wipe confirmation pending',
                description: 'Device #LP-2024-001 awaiting IT confirmation',
                time: '4 hours ago'
              },
              {
                icon: ShoppingBag,
                color: 'text-blue-500',
                title: 'New offer created',
                description: 'iPhone 13 Pro offer sent to Sarah Johnson',
                time: '6 hours ago'
              },
              {
                icon: AlertCircle,
                color: 'text-red-500',
                title: 'Payment overdue',
                description: 'Reminder sent to Mike Davis for iPad payment',
                time: '1 day ago'
              }
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}