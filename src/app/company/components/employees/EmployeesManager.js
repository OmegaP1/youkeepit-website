// src/app/company/components/employees/EmployeesManager.js
'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  UserCheck,
  UserX,
  Shield,
  Trash2,
  MapPin,
  Clock,
  ChevronDown,
  Check,
} from 'lucide-react';

export default function EmployeesManager({ showMessage }) {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample employees data
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      status: 'active',
      joinDate: '2023-01-15',
      location: 'San Francisco, CA',
      manager: 'John Smith',
      devices: [
        { type: 'iPhone 14 Pro', serial: 'A2894-001' },
        { type: 'MacBook Pro 16"', serial: 'MBP-002' },
      ],
      activeOffers: 1,
      completedTransactions: 3,
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b169912d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'EMP-002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'active',
      joinDate: '2022-08-20',
      location: 'New York, NY',
      manager: 'Lisa Wong',
      devices: [
        { type: 'Samsung Galaxy S24', serial: 'SM-S921U-003' },
        { type: 'iPad Pro', serial: 'IPD-004' },
      ],
      activeOffers: 2,
      completedTransactions: 1,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'EMP-003',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Sales',
      position: 'Account Executive',
      status: 'active',
      joinDate: '2023-03-10',
      location: 'Chicago, IL',
      manager: 'Robert Kim',
      devices: [{ type: 'iPad Air', serial: 'A2316-005' }],
      activeOffers: 0,
      completedTransactions: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'EMP-004',
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Design',
      position: 'Senior UX Designer',
      status: 'inactive',
      joinDate: '2021-11-05',
      location: 'Los Angeles, CA',
      manager: 'Anna Rodriguez',
      devices: [
        { type: 'MacBook Pro 13"', serial: 'A2338-006' },
        { type: 'iPad Pro', serial: 'IPD-007' },
      ],
      activeOffers: 1,
      completedTransactions: 2,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'EMP-005',
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'active',
      joinDate: '2022-05-12',
      location: 'Austin, TX',
      manager: 'David Park',
      devices: [{ type: 'Surface Laptop 5', serial: 'RBG-008' }],
      activeOffers: 0,
      completedTransactions: 1,
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        departmentFilter === 'all' || employee.department === departmentFilter;
      const matchesStatus =
        statusFilter === 'all' || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const departments = ['all', ...new Set(employees.map(emp => emp.department))];
  const statuses = ['all', 'active', 'inactive'];

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCreateEmployee = employeeData => {
    const newEmployee = {
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      ...employeeData,
      joinDate: new Date().toISOString().split('T')[0],
      devices: [],
      activeOffers: 0,
      completedTransactions: 0,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=150&h=150&fit=crop&crop=face`,
    };

    setEmployees([...employees, newEmployee]);
    setShowCreateModal(false);
    showMessage && showMessage('Employee created successfully!', 'success');
  };

  const handleDeleteEmployee = employeeId => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    showMessage && showMessage('Employee removed successfully!', 'success');
  };

  const handleStatusToggle = employeeId => {
    setEmployees(
      employees.map(emp =>
        emp.id === employeeId
          ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
          : emp
      )
    );
    showMessage && showMessage('Employee status updated!', 'success');
  };

  const handleBulkAction = action => {
    if (selectedEmployees.length === 0) {
      showMessage && showMessage('Please select employees first', 'warning');
      return;
    }

    showMessage &&
      showMessage(
        `${action} applied to ${selectedEmployees.length} employees`,
        'success'
      );
    setSelectedEmployees([]);
  };

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Management
          </h1>
          <p className="text-gray-600">
            Manage employee profiles, devices, and permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees by name, email, department..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? 'All Status'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(emp => emp.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(employees.map(emp => emp.department)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Offers</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.reduce((sum, emp) => sum + emp.activeOffers, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedEmployees.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 font-medium">
              {selectedEmployees.length} employee
              {selectedEmployees.length === 1 ? '' : 's'} selected
            </span>
            <div className="flex space-x-3">
              <button
                onClick={() => handleBulkAction('Activate')}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('Deactivate')}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction('Export')}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => setSelectedEmployees([])}
                className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDelete={handleDeleteEmployee}
            onStatusToggle={handleStatusToggle}
            onSelect={selected => {
              if (selected) {
                setSelectedEmployees([...selectedEmployees, employee.id]);
              } else {
                setSelectedEmployees(
                  selectedEmployees.filter(id => id !== employee.id)
                );
              }
            }}
            isSelected={selectedEmployees.includes(employee.id)}
            showMessage={showMessage}
            formatDate={formatDate}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No employees found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || departmentFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first employee to get started'}
          </p>
          {!searchTerm &&
            departmentFilter === 'all' &&
            statusFilter === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Add Employee
              </button>
            )}
        </div>
      )}

      {/* Create Employee Modal */}
      {showCreateModal && (
        <CreateEmployeeModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEmployee}
          showMessage={showMessage}
          departments={departments.filter(dept => dept !== 'all')}
        />
      )}
    </div>
  );
}

// Employee Card Component
function EmployeeCard({
  employee,
  onDelete,
  onStatusToggle,
  onSelect,
  isSelected,
  showMessage,
  formatDate,
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-100'
      }`}
    >
      {/* Header with checkbox and actions */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={e => onSelect(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-600">{employee.position}</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                <button
                  onClick={() => {
                    showMessage &&
                      showMessage('Employee details opened', 'info');
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => {
                    showMessage &&
                      showMessage(
                        'Edit employee functionality coming soon!',
                        'info'
                      );
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Employee</span>
                </button>
                <button
                  onClick={() => {
                    onStatusToggle(employee.id);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  {employee.status === 'active' ? (
                    <>
                      <UserX className="w-4 h-4" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Activate</span>
                    </>
                  )}
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    onDelete(employee.id);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-4 flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              employee.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {employee.status === 'active' ? (
              <Check className="w-3 h-3 mr-1" />
            ) : (
              <X className="w-3 h-3 mr-1" />
            )}
            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
          </span>
          <span className="text-xs text-gray-500">{employee.department}</span>
        </div>
      </div>

      {/* Employee Info */}
      <div className="px-6 pb-4 space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{employee.email}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{employee.phone}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{employee.location}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Joined {formatDate(employee.joinDate)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">
              {employee.devices.length}
            </p>
            <p className="text-xs text-gray-600">Devices</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">
              {employee.activeOffers}
            </p>
            <p className="text-xs text-gray-600">Active Offers</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-green-600">
              {employee.completedTransactions}
            </p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create Employee Modal Component
function CreateEmployeeModal({ onClose, onSubmit, showMessage, departments }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    location: '',
    manager: '',
    status: 'active',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      showMessage && showMessage('Please fix the errors below', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Add New Employee
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              value={formData.department}
              onChange={e =>
                setFormData({ ...formData, department: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.department ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <option value="">Select department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={e =>
                setFormData({ ...formData, position: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.position ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter job position"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.location ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager
            </label>
            <input
              type="text"
              value={formData.manager}
              onChange={e =>
                setFormData({ ...formData, manager: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter manager name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={e =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Create Employee</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}