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

          {/* Status Message */}
          <div id="share-modal-description" className="share-modal-status">
            <div className="share-step">
              <span className="share-step-icon">
                {clipboardSuccess ? '✅' : '⚠️'}
              </span>
              <span className="share-step-text">
                {clipboardSuccess ? 'Your Ikigai was copied to clipboard.' : 'Your Ikigai is ready to copy.'}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="share-modal-instructions">
            {clipboardSuccess ? (
              <p>
                Paste it into the LinkedIn post and hit share!
              </p>
            ) : (
              <div>
                <p>Copy this text and paste it into LinkedIn:</p>
                <div className="share-caption-box">
                  <code className="share-caption-text">
                    ✨ My Ikigai ✨<br/>
                    <br/>
                    [Your Ikigai text]<br/>
                    <br/>
                    Discover your own purpose: https://ikigen.vercel.app<br/>
                    #Ikigai #Purpose #SelfDiscovery #Ikigen
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