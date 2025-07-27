'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 6000, 
  onClose, 
  isVisible 
}) => {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      // Auto-dismiss after duration
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 500); // Wait for fade-out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4 sm:mx-0 transition-all duration-500 ease-out";
    
    if (!isVisible) {
      return `${baseStyles} translate-y-full opacity-0 scale-95`;
    }
    
    if (isAnimating) {
      return `${baseStyles} translate-y-0 opacity-100 scale-100`;
    }
    
    return `${baseStyles} translate-y-full opacity-0 scale-95`;
  };

  const getToastContent = () => {
    const baseContent = "ikigai-card shadow-lg border-l-4 p-4 flex items-start space-x-3 backdrop-blur-sm";
    
    switch (type) {
      case 'success':
        return `${baseContent} border-ikigai-gold bg-gradient-to-r from-[var(--theme-card-bg,var(--ikigai-warm-white))]/95 to-white/95`;
      case 'info':
        return `${baseContent} border-blue-400 bg-gradient-to-r from-blue-50/95 to-[var(--theme-card-bg,white)]/95`;
      case 'warning':
        return `${baseContent} border-yellow-400 bg-gradient-to-r from-yellow-50/95 to-[var(--theme-card-bg,white)]/95`;
      case 'error':
        return `${baseContent} border-red-400 bg-gradient-to-r from-red-50/95 to-[var(--theme-card-bg,white)]/95`;
      default:
        return `${baseContent} border-ikigai-gold bg-gradient-to-r from-[var(--theme-card-bg,var(--ikigai-warm-white))]/95 to-white/95`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="w-6 h-6 rounded-full bg-ikigai-gold flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className={getToastContent()}>
        {getIcon()}
        <div className="flex-1 min-w-0">
          <p className="ikigai-body text-sm text-[var(--theme-text,var(--ikigai-brown))] leading-relaxed">
            {message}
            {message.includes('Opening LinkedIn') && (
              <span className="inline-block ml-1 animate-pulse">⋯</span>
            )}
          </p>
        </div>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 500);
          }}
          className="flex-shrink-0 ml-2 text-[var(--theme-text,var(--ikigai-brown))]/60 hover:text-[var(--theme-text,var(--ikigai-brown))] transition-colors duration-200 p-1 rounded-full hover:bg-[var(--theme-text,var(--ikigai-brown))]/10"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast; 