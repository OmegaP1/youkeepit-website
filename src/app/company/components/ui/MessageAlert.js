// src/app/company/components/ui/MessageAlert.js
'use client';

import { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X, Zap } from 'lucide-react';

export default function MessageAlert({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'info':
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (message.type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800 shadow-green-100';
      case 'error':
        return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-800 shadow-red-100';
      case 'info':
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800 shadow-blue-100';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md w-full animate-slide-in-right">
      <div
        className={`${getStyles()} border rounded-2xl p-4 shadow-2xl backdrop-blur-sm`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-1">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight">
              {message.text}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-white/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-white/30 rounded-full h-1 overflow-hidden">
          <div
            className="bg-current h-full rounded-full animate-shrink-width"
            style={{
              animation: 'shrink-width 5s linear forwards',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
