// src/app/company/components/devices/DevicesManager.js
'use client';

import { useState } from 'react';
import { Monitor, Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';

export default function DevicesManager({ showMessage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  // Mock devices data
  const devices = [
    {
      id: 'DEV-001',
      brand: 'Apple',
      model: 'MacBook Pro 16" 2022',
      serialNumber: 'ABCD1234567890',
      assignedTo: 'John Smith',
      status: 'active',
      purchaseDate: '2022-08-15',
      condition: 'excellent',
    },
    {
      id: 'DEV-002',
      brand: 'Dell',
      model: 'XPS 13 Plus',
      serialNumber: 'EFGH2345678901',
      assignedTo: 'Sarah Johnson',
      status: 'in_offer',
      purchaseDate: '2022-06-20',
      condition: 'good',
    },
    {
      id: 'DEV-003',
      brand: 'Lenovo',
      model: 'ThinkPad X1 Carbon Gen 10',
      serialNumber: 'IJKL3456789012',
      assignedTo: 'Mike Wilson',
      status: 'sold',
      purchaseDate: '2021-11-10',
      condition: 'good',
    },
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch =
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || device.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  const brands = [...new Set(devices.map(device => device.brand))];

  const getStatusBadge = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in_offer':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'sold':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Devices</h1>
          <p className="text-gray-600 mt-1">
            Manage company device inventory and assignments.
          </p>
        </div>
        <button
          onClick={() => showMessage('Add device feature coming soon!', 'info')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Add Device</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Brand:</span>
            </div>
            <select
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Device
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Serial Number
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Assigned To
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDevices.map(device => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {device.brand} {device.model}
                        </p>
                        <p className="text-sm text-gray-600">{device.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {device.serialNumber}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {device.assignedTo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(device.status)}`}
                    >
                      {device.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          showMessage(`Viewing device ${device.id}`, 'info')
                        }
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          showMessage(`Editing device ${device.id}`, 'info')
                        }
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          showMessage(`Delete device ${device.id}?`, 'info')
                        }
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}