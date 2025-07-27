'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { isMobileDevice } from '../utils/mobileDetection';

interface ShareModuleProps {
  ikigaiText: string;
  onMount?: () => void;
  onLinkedInShare?: () => void;
}

const ShareModule: React.FC<ShareModuleProps> = ({ ikigaiText, onMount, onLinkedInShare }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    // Trigger fade-in animation after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
      onMount?.();
    }, 100);

    return () => clearTimeout(timer);
  }, [onMount]);

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }



  return (
    <div 
      className={`share-module ${isVisible ? 'visible' : ''}`}
      role="region"
      aria-label="Share your Ikigai insight"
    >
      <div className="share-module-content">
        {/* Header */}
        <div className="share-module-header">
          <h3 className="share-module-title">
            ✨ Share Your Ikigai
          </h3>
          <p className="share-module-description">
            Inspired? Share your insight and inspire others.
          </p>
        </div>

        {/* Share Actions */}
        <div className="share-module-actions">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <button
              onClick={onLinkedInShare}
              className="share-linkedin-button"
              aria-label="Share your Ikigai insight on LinkedIn"
              title={isMobile ? "Copy message and open LinkedIn app" : "Copy caption, download image, open LinkedIn"}
              data-mobile={isMobile}
            >
                              <svg 
                  className="share-linkedin-icon" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {isMobile ? '📱 Open LinkedIn App' : '📤 Share to LinkedIn'}
            </button>



            {/* TODO: Add "Copy to Clipboard" functionality
                - Use navigator.clipboard.write() with ClipboardItem
                - Convert canvas to blob and copy as image/png
                - Add clipboard icon button alongside download/share
                - Show success toast notification
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModule; 