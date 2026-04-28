// src/app/company/components/employees/EmployeeDetails.js
'use client';

import { useState } from 'react';
import { 
  X, 
  Edit3, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Building, 
  Briefcase, 
  Users, 
  Smartphone, 
  User,
  Activity,
  Clock,
  Award,
  FileText
} from 'lucide-react';

export default function EmployeeDetails({ employee, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState('overview');

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    if (status === 'Active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  // Mock data for demonstration
  const mockDevices = [
    {
      id: 1,
      type: 'MacBook Pro',
      model: '16-inch M3',
      serialNumber: 'MBP-2024-001',
      assignedDate: '2023-01-15',
      status: 'Active'
    },
    {
      id: 2,
      type: 'iPhone',
      model: '15 Pro',
      serialNumber: 'IP-2024-001',
      assignedDate: '2023-01-15',
      status: 'Active'
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: 'Device Assignment',
      description: 'MacBook Pro assigned',
      date: '2024-01-15',
      time: '09:30 AM'
    },
    {
      id: 2,
      type: 'Profile Update',
      description: 'Phone number updated',
      date: '2024-01-10',
      time: '02:15 PM'
    },
    {
      id: 3,
      type: 'Login',
      description: 'Last login to company portal',
      date: '2024-01-08',
      time: '08:45 AM'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'devices', label: 'Devices', icon: Smartphone },
    { id: 'activity', label: 'Activity', icon: Activity }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Full Name</p>
            <p className="text-gray-900 font-medium">
              {employee.firstName} {employee.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Employee ID</p>
            <p className="text-gray-900 font-medium">EMP-{employee.id.toString().padStart(4, '0')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email Address</p>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{employee.email}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone Number</p>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{employee.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Work Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Department</p>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900 font-medium">{employee.department}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Position</p>
            <p className="text-gray-900 font-medium">{employee.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Start Date</p>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{formatDate(employee.startDate)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Manager</p>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{employee.manager}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{employee.location}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className={getStatusBadge(employee.status)}>
              {employee.status}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{employee.deviceCount}</p>
          <p className="text-sm text-blue-700">Assigned Devices</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">
            {Math.floor((new Date() - new Date(employee.startDate)) / (1000 * 60 * 60 * 24 * 30))}
          </p>
          <p className="text-sm text-green-700">Months Employed</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">0</p>
          <p className="text-sm text-purple-700">Completed Offers</p>
        </div>
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Assigned Devices</h3>
        <span className="text-sm text-gray-600">{mockDevices.length} devices</span>
      </div>
      
      {mockDevices.length === 0 ? (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No devices assigned to this employee</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockDevices.map((device) => (
            <div key={device.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{device.type}</p>
                    <p className="text-sm text-gray-600">{device.model}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {device.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    Assigned: {formatDate(device.assignedDate)}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Serial Number:</span> {device.serialNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <span className="text-sm text-gray-600">Last 30 days</span>
      </div>
      
      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.type}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(activity.date)} at {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {getInitials(employee.firstName, employee.lastName)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-gray-600">{employee.position} • {employee.department}</p>
              <span className={getStatusBadge(employee.status)}>
                {employee.status}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEdit(employee)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mt-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'devices' && renderDevices()}
        {activeTab === 'activity' && renderActivity()}
      </div>
    </div>
  );
}