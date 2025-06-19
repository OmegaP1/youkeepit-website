// src/app/company/components/employees/EmployeesManager.js
'use client';

import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Mail,
  Building,
  Calendar,
  DollarSign,
  ShoppingBag,
} from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';

export default function EmployeesManager({ showMessage }) {
  const { employees, isLoading } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage employee information and offer history.
          </p>
        </div>
        <button
          onClick={() =>
            showMessage('Add employee feature coming soon!', 'info')
          }
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Department:
              </span>
            </div>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-600">{employee.id}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  showMessage(`Viewing ${employee.name}'s profile`, 'info')
                }
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {employee.department}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Joined{' '}
                  {new Date(employee.joinDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-orange-600">
                    {employee.activeOffers}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Active</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <ShoppingBag className="w-4 h-4 text-green-500" />
                  <span className="font-bold text-green-600">
                    {employee.completedOffers}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-blue-600">
                    ${employee.totalRevenue}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Revenue</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No employees found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || departmentFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Add employees to start managing their device offers.'}
          </p>
        </div>
      )}
    </div>
  );
}
