'use client';

import React, { useState } from 'react';
import { useTheme, ThemeType } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, audioEnabled, setAudioEnabled, isAudioPlaying } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { 
      value: 'calm' as ThemeType, 
      label: 'Calm', 
      description: 'Soft beige tones, peaceful ambiance',
      icon: '🕊️'
    },
    { 
      value: 'bold' as ThemeType, 
      label: 'Bold', 
      description: 'High contrast, rich saturation',
      icon: '⚡'
    },
    { 
      value: 'forest' as ThemeType, 
      label: 'Forest', 
      description: 'Deep greens, earthy browns',
      icon: '🌲'
    },
    { 
      value: 'dawn' as ThemeType, 
      label: 'Dawn', 
      description: 'Warm oranges, lavender gradients',
      icon: '🌅'
    }
  ];

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <div className="theme-toggle-container">
      {/* Theme Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="theme-toggle-button"
          aria-label="Choose your theme"
        >
          <span className="theme-icon">{currentTheme?.icon}</span>
          <span className="theme-label">{currentTheme?.label}</span>
          <svg 
            className={`theme-arrow ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="theme-dropdown">
            <div className="theme-dropdown-header">
              <h3>Choose Your Theme</h3>
              <p>Select a mood that resonates with your journey</p>
            </div>
            <div className="theme-options">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`theme-option ${theme === themeOption.value ? 'active' : ''}`}
                >
                  <span className="theme-option-icon">{themeOption.icon}</span>
                  <div className="theme-option-content">
                    <span className="theme-option-label">{themeOption.label}</span>
                    <span className="theme-option-description">{themeOption.description}</span>
                  </div>
                  {theme === themeOption.value && (
                    <svg className="theme-check" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            
            {/* Audio Controls */}
            <div className="audio-controls">
              <div className="audio-toggle">
                <label className="audio-label">
                  <input
                    type="checkbox"
                    checked={audioEnabled}
                    onChange={(e) => setAudioEnabled(e.target.checked)}
                    className="audio-checkbox"
                  />
                  <span className="audio-text">
                    {audioEnabled ? '🔊' : '🔇'} Ambient Audio
                  </span>
                  {isAudioPlaying && (
                    <span className="audio-status">Playing</span>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="theme-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeToggle; 