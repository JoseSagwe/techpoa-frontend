"use client";

import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Define background color based on toast type
  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-600/80';
      case 'error': return 'bg-red-600/80';
      case 'warning': return 'bg-amber-600/80';
      case 'info': default: return 'bg-blue-600/80';
    }
  };

  // Set the appropriate icon based on toast type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md animate-slide-in">
      <div className={`${getBgColor()} backdrop-blur-sm text-white p-4 rounded-lg shadow-lg flex items-start`}>
        <div className="mr-3">
          {getIcon()}
        </div>
        <div className="flex-1">{message}</div>
        <button 
          onClick={onClose} 
          className="ml-3 text-white/80 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;