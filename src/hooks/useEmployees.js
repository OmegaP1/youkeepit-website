// src/hooks/useEmployees.js
'use client';

import { useState, useEffect } from 'react';

const MOCK_EMPLOYEES = [
  {
    id: 'EMP-001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    activeOffers: 1,
    completedOffers: 3,
    totalRevenue: 2450,
    joinDate: '2022-01-15',
    status: 'active',
  },
  {
    id: 'EMP-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    activeOffers: 0,
    completedOffers: 2,
    totalRevenue: 980,
    joinDate: '2021-11-20',
    status: 'active',
  },
];

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!cancelled) setEmployees(MOCK_EMPLOYEES);
      } catch (err) {
        if (!cancelled) setError('Failed to fetch employees');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchEmployees();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    employees,
    isLoading,
    error,
  };
}
