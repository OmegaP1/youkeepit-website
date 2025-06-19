// src/app/company/components/employees/EmployeesManager.js
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Users, Mail, Eye, Plus } from 'lucide-react';

export default function EmployeesManager({ showMessage }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmployees([
        {
          id: 'EMP001',
          name: 'John Smith',
          email: 'john.smith@company.com',
          department: 'Engineering',
          position: 'Senior Developer',
          joinDate: '2022-03-15',
          activeOffers: 1,
          completedPurchases: 2,
          totalSpent: 2450,
          lastActivity: '2024-06-15T10:30:00Z'
        },
        {
          id: 'EMP002',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2021-08-20',
          activeOffers: 1,
          completedPurchases: 1,
          totalSpent: 650,
          lastActivity: '2024-06-14T14:20:00Z'
        },
        {
          id: 'EMP003',
          name: 'Mike Davis',
          email: 'mike.davis@company.com',
          department: 'Sales',
          position: 'Sales Representative',
          joinDate: '2023-01-10',
          activeOffers: 1,
          completedPurchases: 0,
          totalSpent: 0,
          lastActivity: '2024-06-13T09:45:00Z'
        },
        {
          id: 'EMP004',
          name: 'Emily Chen',
          email: 'emily.chen@company.com',
          department: 'Engineering',
          position: 'Product Designer',
          joinDate: '2022-11-05',
          activeOffers: 1,
          completedPurchases: 1,
          totalSpent: 800,
          lastActivity: '2024-06-12T16:30:00Z'
        },
        {
          id: 'EMP005',
          name: 'Alex Rodriguez',
          email: 'alex.rodriguez@company.com',
          department: 'Operations',
          position: 'Operations Manager',
          joinDate: '2020-05-18',
          activeOffers: 0,
          completedPurchases: 3,
          totalSpent: 1850,
          lastActivity: '2024-06-11T11:15:00Z'
        }
      ]);
    } catch (error) {
      showMessage('Error loading employees', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (activeOffers) => {
    if (activeOffers > 0) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (activeOffers) => {
    if (activeOffers > 0) return `${activeOffers} Active Offer${activeOffers > 1 ? 's' : ''}`;
    return 'Available';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage employee accounts and purchase history</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Department Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="operations">Operations</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.activeOffers)}`}>
                {getStatusText(employee.activeOffers)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {employee.email}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                ID: {employee.id} • Joined {formatDate(employee.joinDate)}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{employee.completedPurchases}</div>
                  <div className="text-xs text-gray-500">Purchases</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">${employee.totalSpent.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Spent</div>
                </div>
              </div>

              <div className="pt-3">
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-500">
            {searchTerm || departmentFilter !== 'all' ? 'No employees match your filters' : 'No employees found'}
          </div>
          {!searchTerm && departmentFilter === 'all' && (
            <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
              Add your first employee
            </button>
          )}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-orange-600">
            {employees.filter(e => e.activeOffers > 0).length}
          </div>
          <div className="text-sm text-gray-600">Active Offers</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">
            {employees.reduce((sum, e) => sum + e.completedPurchases, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Purchases</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-900">
            ${employees.reduce((sum, e) => sum + e.totalSpent, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>
    </div>
  );
}