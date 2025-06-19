// src/app/company/components/ui/MessageAlert.js
'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function MessageAlert({ message, onClose, autoClose = true }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setIsExiting(false);

      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [message, autoClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!message || !isVisible) return null;

  const getAlertConfig = type => {
    const configs = {
      success: {
        icon: CheckCircle,
        bgColor: 'bg-green-50 border-green-200',
        iconColor: 'text-green-500',
        textColor: 'text-green-800',
        buttonColor: 'hover:bg-green-100',
      },
      error: {
        icon: AlertCircle,
        bgColor: 'bg-red-50 border-red-200',
        iconColor: 'text-red-500',
        textColor: 'text-red-800',
        buttonColor: 'hover:bg-red-100',
      },
      warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50 border-yellow-200',
        iconColor: 'text-yellow-500',
        textColor: 'text-yellow-800',
        buttonColor: 'hover:bg-yellow-100',
      },
      info: {
        icon: Info,
        bgColor: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-800',
        buttonColor: 'hover:bg-blue-100',
      },
    };
    return configs[type] || configs.info;
  };

  const config = getAlertConfig(message.type);
  const Icon = config.icon;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md">
      <div
        className={`${config.bgColor} border rounded-xl p-4 shadow-lg transform transition-all duration-300 ${
          isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <div className="flex items-start space-x-3">
          <Icon
            className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`}
          />
          <div className="flex-1">
            <p className={`text-sm font-medium ${config.textColor}`}>
              {message.text}
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`p-1 rounded-lg ${config.buttonColor} transition-colors`}
          >
            <X className={`w-4 h-4 ${config.textColor}`} />
          </button>
        </div>
      </div>
    </div>
  );
}