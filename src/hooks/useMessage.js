// src/hooks/useMessage.js
'use client';

import { useState, useCallback } from 'react';

export function useMessage() {
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((text, type = 'info', duration = 5000) => {
    setMessage({ text, type });

    if (duration > 0) {
      setTimeout(() => {
        setMessage(null);
      }, duration);
    }
  }, []);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    showMessage,
    clearMessage,
  };
}