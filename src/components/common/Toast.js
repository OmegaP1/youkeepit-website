// src/components/common/Toast.js
'use client'

import { toast as hotToast } from 'react-hot-toast'

export const toast = {
  success: (message) => hotToast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#FFFFFF',
    },
  }),
  
  error: (message) => hotToast.error(message, {
    duration: 5000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#FFFFFF',
    },
  }),
  
  loading: (message) => hotToast.loading(message, {
    position: 'top-right',
  }),
  
  dismiss: hotToast.dismiss,
}