import React from 'react';

interface IkigaiExportCardProps {
  ikigaiText: string;
}

const IkigaiExportCard: React.FC<IkigaiExportCardProps> = ({ ikigaiText }) => {
  return (
    <div
      style={{
        width: '600px',
        padding: '60px 48px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: '#2D1810',
        textAlign: 'center' as const,
        border: '2px solid #E6D8C5',
        position: 'relative' as const,
        backgroundImage: 'linear-gradient(135deg, rgba(248, 246, 240, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
      }}
    >
      {/* Decorative top accent */}
      <div
        style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#DDB892',
          borderRadius: '2px',
          margin: '0 auto 40px auto',
        }}
      />

      {/* Heart Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#DDB892',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px auto',
          boxShadow: '0 4px 16px rgba(221, 184, 146, 0.3)',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 20 20"
          fill="white"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
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
          color: '#8B5A2B',
          margin: '0 0 32px 0',
          letterSpacing: '-0.5px',
          lineHeight: '1.2',
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
        }}
      >
        {ikigaiText}
      </p>

      {/* Decorative bottom accent */}
      <div
        style={{
          width: '120px',
          height: '2px',
          backgroundColor: '#E6D8C5',
          borderRadius: '1px',
          margin: '0 auto',
        }}
      />

      {/* Subtle branding */}
      <div
        style={{
          marginTop: '32px',
          fontSize: '14px',
          color: '#A0956B',
          fontStyle: 'italic',
          opacity: 0.7,
        }}
      >
        Discover your purpose with Ikigen
      </div>
    </div>
  );
};

export default IkigaiExportCard; 