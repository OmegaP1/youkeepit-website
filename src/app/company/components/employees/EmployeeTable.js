// src/app/company/components/employees/EmployeeTable.js
'use client';

import { useState } from 'react';
import { 
  Edit3, 
  Eye, 
  Trash2, 
  MoreVertical,
  Mail,
  Phone,
  Building,
  Users,
  Smartphone
} from 'lucide-react';

export default function EmployeeTable({ employees, onEdit, onDelete, onViewDetails }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'Active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDropdownToggle = (employeeId) => {
    setOpenDropdown(openDropdown === employeeId ? null : employeeId);
  };

  const handleAction = (action, employee) => {
    setOpenDropdown(null);
    action(employee);
  };

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No employees found
        </h3>
        <p className="text-gray-600 mb-6">
          Get started by adding your first employee to the system.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Employee</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Department</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Position</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Start Date</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Devices</th>
              <th className="text-center py-4 px-6 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {getInitials(employee.firstName, employee.lastName)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-gray-900">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    {employee.department}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-900">{employee.position}</td>
                <td className="py-4 px-6">
                  <span className={getStatusBadge(employee.status)}>
                    {employee.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-900">{formatDate(employee.startDate)}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-gray-600">
                    <Smartphone className="w-4 h-4 mr-2" />
                    <span>{employee.deviceCount}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(employee.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    {openDropdown === employee.id && (
                      <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <button
                          onClick={() => handleAction(onViewDetails, employee)}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => handleAction(onEdit, employee)}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Edit Employee</span>
                        </button>
                        <hr className="my-2" />
                        <button
                          onClick={() => handleAction(onDelete, employee.id)}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {employees.map((employee) => (
          <div key={employee.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {getInitials(employee.firstName, employee.lastName)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <span className={getStatusBadge(employee.status)}>
                    {employee.status}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle(employee.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
                
                {openDropdown === employee.id && (
                  <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => handleAction(onViewDetails, employee)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleAction(onEdit, employee)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Employee</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => handleAction(onDelete, employee.id)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {employee.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {employee.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <Building className="w-4 h-4 mr-2" />
                {employee.department} • {employee.position}
              </p>
              <p className="flex items-center text-gray-600">
                <Smartphone className="w-4 h-4 mr-2" />
                {employee.deviceCount} devices
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}