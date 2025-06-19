// src/app/company/components/employees/EmployeesManager.js
'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  UserPlus,
  Edit3,
  Eye,
  Trash2,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Briefcase,
} from 'lucide-react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import EmployeeDetails from './EmployeeDetails';

export default function EmployeesManager({ showMessage }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock employee data - replace with API call
  const mockEmployees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Active',
      startDate: '2023-01-15',
      location: 'New York, NY',
      manager: 'Sarah Wilson',
      deviceCount: 2,
      avatar: null,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 987-6543',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'Active',
      startDate: '2022-08-20',
      location: 'Los Angeles, CA',
      manager: 'Mike Johnson',
      deviceCount: 1,
      avatar: null,
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Sales',
      position: 'Sales Director',
      status: 'Active',
      startDate: '2021-03-10',
      location: 'Chicago, IL',
      manager: 'CEO',
      deviceCount: 3,
      avatar: null,
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 321-0987',
      department: 'HR',
      position: 'HR Specialist',
      status: 'Inactive',
      startDate: '2023-06-01',
      location: 'Remote',
      manager: 'Linda Brown',
      deviceCount: 0,
      avatar: null,
    },
  ];

  // Get unique departments for filter
  const departments = [...new Set(mockEmployees.map(emp => emp.department))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEmployees(mockEmployees);
      setFilteredEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter employees based on search and filters
  useEffect(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        !selectedDepartment || employee.department === selectedDepartment;
      const matchesStatus =
        !selectedStatus || employee.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  const handleAddEmployee = employeeData => {
    const newEmployee = {
      ...employeeData,
      id: employees.length + 1,
      deviceCount: 0,
      avatar: null,
    };

    setEmployees(prev => [...prev, newEmployee]);
    setShowAddForm(false);
    showMessage && showMessage('Employee added successfully!', 'success');
  };

  const handleEditEmployee = employee => {
    setEditingEmployee(employee);
    setShowAddForm(true);
  };

  const handleUpdateEmployee = updatedData => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === editingEmployee.id ? { ...emp, ...updatedData } : emp
      )
    );
    setEditingEmployee(null);
    setShowAddForm(false);
    showMessage && showMessage('Employee updated successfully!', 'success');
  };

  const handleDeleteEmployee = employeeId => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      showMessage && showMessage('Employee deleted successfully!', 'success');
    }
  };

  const handleViewDetails = employee => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
    setSelectedStatus('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage employee accounts and permissions. (
            {filteredEmployees.length} employees)
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
        onViewDetails={handleViewDetails}
      />

      {/* Add/Edit Employee Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={
                editingEmployee ? handleUpdateEmployee : handleAddEmployee
              }
              onCancel={() => {
                setShowAddForm(false);
                setEditingEmployee(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {showDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <EmployeeDetails
              employee={selectedEmployee}
              onClose={() => {
                setShowDetails(false);
                setSelectedEmployee(null);
              }}
              onEdit={handleEditEmployee}
            />
          </div>
        </div>
      )}
    </div>
  );
}