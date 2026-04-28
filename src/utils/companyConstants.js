// src/utils/companyConstants.js
export const COMPANY_OFFER_STATUSES = {
  DRAFT: 'draft',
  PENDING_EMPLOYEE: 'pending-employee',
  PENDING_WIPE: 'pending-wipe',
  WIPE_CONFIRMED: 'wipe-confirmed',
  PAYMENT_PENDING: 'payment-pending',
  PAYMENT_COMPLETED: 'payment-completed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const DEVICE_TYPES = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'phone', label: 'Phone' },
  { value: 'monitor', label: 'Monitor' },
  { value: 'accessories', label: 'Accessories' }
];

export const DEVICE_BRANDS = [
  { value: 'apple', label: 'Apple' },
  { value: 'dell', label: 'Dell' },
  { value: 'hp', label: 'HP' },
  { value: 'lenovo', label: 'Lenovo' },
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'other', label: 'Other' }
];

export const DEVICE_CONDITIONS = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
];

export const DEPARTMENTS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' }
];