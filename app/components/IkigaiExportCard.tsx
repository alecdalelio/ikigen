import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface IkigaiExportCardProps {
  ikigaiText: string;
}

const IkigaiExportCard: React.FC<IkigaiExportCardProps> = ({ ikigaiText }) => {
  const { theme } = useTheme();

  // Theme-specific colors
  const getThemeColors = () => {
    switch (theme) {
      case 'bold':
        return {
          backgroundColor: '#1A1A1A',
          cardBackground: '#2D2D2D',
          textColor: '#FFFFFF',
          accentColor: '#DAA520',
          borderColor: '#DAA520',
          gradientOverlay: 'linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, rgba(45, 45, 45, 0.1) 100%)'
        };
      case 'forest':
        return {
          backgroundColor: '#F0FFF0',
          cardBackground: '#FFFFFF',
          textColor: '#2F4F2F',
          accentColor: '#228B22',
          borderColor: '#8FBC8F',
          gradientOverlay: 'linear-gradient(135deg, rgba(143, 188, 143, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
        };
      case 'dawn':
        return {
          backgroundColor: '#FFE4E1',
          cardBackground: '#FFFFFF',
          textColor: '#4A4A4A',
          accentColor: '#DDA0DD',
          borderColor: '#FFB6C1',
          gradientOverlay: 'linear-gradient(135deg, rgba(255, 182, 193, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
        };
      default: // calm
        return {
          backgroundColor: '#FAF7F0',
          cardBackground: '#FFFFFF',
          textColor: '#2D1810',
          accentColor: '#DDB892',
          borderColor: '#E6D8C5',
          gradientOverlay: 'linear-gradient(135deg, rgba(248, 246, 240, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div
      style={{
        width: '600px',
        padding: '60px 48px',
        backgroundColor: colors.cardBackground,
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: colors.textColor,
        textAlign: 'center' as const,
        border: `2px solid ${colors.borderColor}`,
        position: 'relative' as const,
        backgroundImage: colors.gradientOverlay,
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      }}
    >
              {/* Decorative top accent */}
        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: colors.accentColor,
            borderRadius: '2px',
            margin: '0 auto 40px auto',
          }}
        />

        {/* Heart Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: colors.accentColor,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px auto',
            boxShadow: `0 4px 16px ${colors.accentColor}40`,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 20 20"
            fill="white"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '400',
            color: colors.accentColor,
            margin: '0 0 32px 0',
            letterSpacing: '-0.5px',
            lineHeight: '1.2',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          Your Ikigai
        </h1>

        {/* Ikigai Text */}
        <p
          style={{
            fontSize: '24px',
            lineHeight: '1.5',
            color: colors.textColor,
            margin: '0 0 40px 0',
            fontWeight: '400',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {ikigaiText || 'Your unique purpose and reason for being...'}
        </p>

        {/* Decorative bottom accent */}
        <div
          style={{
            width: '120px',
            height: '2px',
            backgroundColor: colors.borderColor,
            borderRadius: '1px',
            margin: '0 auto',
          }}
        />

        {/* Subtle branding */}
        <div
          style={{
            marginTop: '32px',
            fontSize: '14px',
            color: colors.textColor,
            fontStyle: 'italic',
            opacity: 0.6,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          Discover your purpose with Ikigen
        </div>
    </div>
  );
};

export default IkigaiExportCard; 