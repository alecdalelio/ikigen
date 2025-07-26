import React from 'react';

interface IkigaiVennDiagramProps {
  love: string;
  goodAt: string;
  worldNeeds: string;
  paidFor: string;
  ikigai?: string;
}

export default function IkigaiVennDiagram({ 
  love, 
  goodAt, 
  worldNeeds, 
  paidFor, 
  ikigai 
}: IkigaiVennDiagramProps) {
  return (
    <div className="ikigai-compass-container">
      <div className="ikigai-compass">
        {/* Center Ikigai Circle */}
        <div className="compass-center">
          <div className="compass-center-content">
            <div className="compass-center-icon">✨</div>
            <h3 className="compass-center-title">Your Ikigai</h3>
            {ikigai && (
              <p className="compass-center-text">{ikigai}</p>
            )}
          </div>
        </div>

        {/* Top Circle - What You Love */}
        <div className="compass-circle compass-love">
          <div className="compass-circle-content">
            <h4 className="compass-circle-title">What You Love</h4>
            <p className="compass-circle-text">{love}</p>
            <div className="compass-quadrant-label">Passion</div>
          </div>
        </div>

        {/* Right Circle - What You're Good At */}
        <div className="compass-circle compass-skill">
          <div className="compass-circle-content">
            <h4 className="compass-circle-title">What You're Good At</h4>
            <p className="compass-circle-text">{goodAt}</p>
            <div className="compass-quadrant-label">Profession</div>
          </div>
        </div>

        {/* Bottom Circle - What the World Needs */}
        <div className="compass-circle compass-need">
          <div className="compass-circle-content">
            <h4 className="compass-circle-title">What the World Needs</h4>
            <p className="compass-circle-text">{worldNeeds}</p>
            <div className="compass-quadrant-label">Mission</div>
          </div>
        </div>

        {/* Left Circle - What You Can Be Paid For */}
        <div className="compass-circle compass-value">
          <div className="compass-circle-content">
            <h4 className="compass-circle-title">What You Can Be Paid For</h4>
            <p className="compass-circle-text">{paidFor}</p>
            <div className="compass-quadrant-label">Vocation</div>
          </div>
        </div>

        {/* Connecting lines (desktop only) */}
        <div className="compass-connectors">
          <div className="compass-line compass-line-top"></div>
          <div className="compass-line compass-line-right"></div>
          <div className="compass-line compass-line-bottom"></div>
          <div className="compass-line compass-line-left"></div>
        </div>
      </div>
    </div>
  );
} 