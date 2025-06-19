// src/hooks/useMessage.js
'use client';

import { useState, useCallback } from 'react';

export function useMessage() {
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((text, type = 'info') => {
    setMessage({ text, type });
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
