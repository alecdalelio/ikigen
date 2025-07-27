import React from 'react';

interface IkigaiExportCardProps {
  text: string;
}

const IkigaiExportCard: React.FC<IkigaiExportCardProps> = ({ text }) => {
  return (
    <div
      style={{
        width: '600px',
        padding: '60px 48px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: '#2D1810',
        textAlign: 'center' as const,
        border: '2px solid #E6D8C5',
        position: 'relative' as const,
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        boxSizing: 'border-box' as const,
      }}
    >
              {/* Large Emoji */}
        <div
          style={{
            fontSize: '64px',
            margin: '0 0 32px 0',
            lineHeight: '1',
          }}
        >
          ✨
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '400',
            color: '#8B5A2B',
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
            color: '#2D1810',
            margin: '0 0 40px 0',
            fontWeight: '400',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'Georgia, "Times New Roman", serif',
            padding: '0 20px',
            wordWrap: 'break-word' as const,
            textAlign: 'center' as const,
          }}
        >
          {text || 'Your unique purpose and reason for being awaits discovery...'}
        </p>

        {/* Footer tagline */}
        <div
          style={{
            marginTop: '32px',
            fontSize: '14px',
            color: '#7F5539',
            fontStyle: 'italic',
            opacity: 0.7,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          Discover your purpose with Ikigen
        </div>
    </div>
  );
};

export default IkigaiExportCard; 