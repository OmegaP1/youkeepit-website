// src/app/company/components/transactions/TransactionsManager.js
'use client';

import { useState } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  Eye,
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

export default function TransactionsManager({ showMessage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock transactions data
  const transactions = [
    {
      id: 'TXN-001',
      offerId: 'OFF-003',
      employeeName: 'Mike Wilson',
      deviceModel: 'ThinkPad X1 Carbon Gen 10',
      amount: 520,
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      processedAt: '2024-06-18T16:30:00Z',
      reference: 'PAY-1234567890',
    },
    {
      id: 'TXN-002',
      offerId: 'OFF-005',
      employeeName: 'Lisa Chen',
      deviceModel: 'MacBook Air M2',
      amount: 680,
      status: 'completed',
      paymentMethod: 'PayPal',
      processedAt: '2024-06-17T14:20:00Z',
      reference: 'PAY-0987654321',
    },
    {
      id: 'TXN-003',
      offerId: 'OFF-002',
      employeeName: 'Sarah Johnson',
      deviceModel: 'Dell XPS 13 Plus',
      amount: 420,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      processedAt: null,
      reference: null,
    },
    {
      id: 'TXN-004',
      offerId: 'OFF-006',
      employeeName: 'David Brown',
      deviceModel: 'HP EliteBook 850',
      amount: 350,
      status: 'failed',
      paymentMethod: 'Credit Card',
      processedAt: '2024-06-16T10:15:00Z',
      reference: 'PAY-1122334455',
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.deviceModel
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalAmount = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">
            Track and manage payment transactions.
          </p>
        </div>
        <button
          onClick={() => showMessage('Export feature coming soon!', 'info')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 shadow-md"
        >
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ${totalAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {
                  filteredTransactions.filter(t => t.status === 'completed')
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {
                  filteredTransactions.filter(t => t.status === 'pending')
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {filteredTransactions.filter(t => t.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Transaction
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Employee
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Device
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Amount
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Date
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Offer: {transaction.offerId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {transaction.employeeName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {transaction.deviceModel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">
                      ${transaction.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {formatDate(transaction.processedAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        showMessage(
                          `Viewing transaction ${transaction.id}`,
                          'info'
                        )
                      }
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No transactions found
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Transactions will appear here once employees start purchasing devices.'}
          </p>
        </div>
      )}
    </div>
  );
}