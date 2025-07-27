'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ShareSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  clipboardSuccess: boolean;
}

const ShareSuccessModal: React.FC<ShareSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  clipboardSuccess 
}) => {
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (!isOpen) return;

    // Auto-dismiss countdown
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onClose();
          return 6; // Reset for next time
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Reset countdown when modal opens
    if (isOpen) {
      setCountdown(6);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="share-modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="share-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        aria-describedby="share-modal-description"
      >
        <div className="share-modal-content">
          {/* Header */}
          <div className="share-modal-header">
            <h2 id="share-modal-title" className="share-modal-title">
              Your post is almost ready ✨
            </h2>
          </div>

          {/* Steps */}
          <div id="share-modal-description" className="share-modal-steps">
            <div className="share-step">
              <span className="share-step-icon">✅</span>
              <span className="share-step-text">Image downloaded</span>
            </div>
            
            <div className="share-step">
              <span className="share-step-icon">
                {clipboardSuccess ? '✅' : '⚠️'}
              </span>
              <span className="share-step-text">
                {clipboardSuccess ? 'Caption copied' : 'Caption ready (copy manually)'}
              </span>
            </div>
            
            <div className="share-step">
              <span className="share-step-icon">✅</span>
              <span className="share-step-text">LinkedIn post opened</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="share-modal-instructions">
            {clipboardSuccess ? (
              <p>
                Just paste <kbd className="share-kbd">Cmd+V</kbd> and upload your image to finish sharing your Ikigai.
              </p>
            ) : (
              <div>
                <p>Copy this caption and upload your image on LinkedIn:</p>
                <div className="share-caption-box">
                  <code className="share-caption-text">
                    I just completed my Ikigai journey with Ikigen 💫<br/>
                    <br/>
                    Here's what I discovered about my purpose in life.<br/>
                    <br/>
                    Try it yourself at https://ikigen.vercel.app
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="share-modal-actions">
            <button
              onClick={onClose}
              className="share-modal-button"
              autoFocus
            >
              Got it ({countdown}s)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareSuccessModal; 