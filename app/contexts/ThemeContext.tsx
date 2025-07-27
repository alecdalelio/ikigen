'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'calm' | 'bold' | 'forest' | 'dawn';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  isAudioPlaying: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('calm');
  const [audioEnabled, setAudioEnabledState] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('ikigai-theme') as ThemeType;
    const savedAudio = localStorage.getItem('ikigai-audio-enabled') === 'true';
    
    if (savedTheme && ['calm', 'bold', 'forest', 'dawn'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setAudioEnabledState(savedAudio);
  }, []);

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('theme-calm', 'theme-bold', 'theme-forest', 'theme-dawn');
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Set CSS variables based on theme
    switch (theme) {
      case 'calm':
        root.style.setProperty('--theme-primary', '#F5E6D3');
        root.style.setProperty('--theme-secondary', '#E8D5C4');
        root.style.setProperty('--theme-accent', '#DDB892');
        root.style.setProperty('--theme-text', '#7F5539');
        root.style.setProperty('--theme-background', 'linear-gradient(135deg, #FAF7F0 0%, #F5E6D3 100%)');
        root.style.setProperty('--theme-card-bg', 'rgba(248, 246, 240, 0.8)');
        root.style.setProperty('--theme-border', 'rgba(221, 184, 146, 0.3)');
        break;
      case 'bold':
        root.style.setProperty('--theme-primary', '#B8860B');
        root.style.setProperty('--theme-secondary', '#CD853F');
        root.style.setProperty('--theme-accent', '#DAA520');
        root.style.setProperty('--theme-text', '#2F1B14');
        root.style.setProperty('--theme-background', 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)');
        root.style.setProperty('--theme-card-bg', 'rgba(45, 45, 45, 0.9)');
        root.style.setProperty('--theme-border', 'rgba(218, 165, 32, 0.4)');
        break;
      case 'forest':
        root.style.setProperty('--theme-primary', '#8FBC8F');
        root.style.setProperty('--theme-secondary', '#228B22');
        root.style.setProperty('--theme-accent', '#32CD32');
        root.style.setProperty('--theme-text', '#2F4F2F');
        root.style.setProperty('--theme-background', 'linear-gradient(135deg, #F0FFF0 0%, #E6F3E6 100%)');
        root.style.setProperty('--theme-card-bg', 'rgba(240, 255, 240, 0.8)');
        root.style.setProperty('--theme-border', 'rgba(143, 188, 143, 0.4)');
        break;
      case 'dawn':
        root.style.setProperty('--theme-primary', '#FFB6C1');
        root.style.setProperty('--theme-secondary', '#DDA0DD');
        root.style.setProperty('--theme-accent', '#F0A0A0');
        root.style.setProperty('--theme-text', '#4A4A4A');
        root.style.setProperty('--theme-background', 'linear-gradient(135deg, #FFE4E1 0%, #E6E6FA 100%)');
        root.style.setProperty('--theme-card-bg', 'rgba(255, 228, 225, 0.8)');
        root.style.setProperty('--theme-border', 'rgba(255, 182, 193, 0.4)');
        break;
    }
  }, [theme]);

  // Handle audio playback
  useEffect(() => {
    if (audioEnabled) {
      // Create audio element if it doesn't exist
      if (!audioElement) {
        const audio = new Audio();
        audio.loop = true;
        audio.volume = 0.3;
        setAudioElement(audio);
      }
      
      if (audioElement) {
        // Set audio source based on theme
        const audioSources = {
          calm: '/audio/calm-ambient.mp3',
          bold: '/audio/bold-ambient.mp3',
          forest: '/audio/forest-ambient.mp3',
          dawn: '/audio/dawn-ambient.mp3'
        };
        
        audioElement.src = audioSources[theme];
        
        // Play audio
        audioElement.play().then(() => {
          setIsAudioPlaying(true);
        }).catch(() => {
          // Audio play failed (user hasn't interacted yet)
          setIsAudioPlaying(false);
        });
      }
    } else if (audioElement) {
      audioElement.pause();
      setIsAudioPlaying(false);
    }
    
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioEnabled, theme, audioElement]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('ikigai-theme', newTheme);
  };

  const setAudioEnabled = (enabled: boolean) => {
    setAudioEnabledState(enabled);
    localStorage.setItem('ikigai-audio-enabled', enabled.toString());
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        audioEnabled, 
        setAudioEnabled, 
        isAudioPlaying 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 