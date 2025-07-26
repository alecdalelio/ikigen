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
  // Truncate text to fit in circles
  const truncateText = (text: string, maxLength: number = 15) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="ikigai-venn-diagram-container">
      <div className="ikigai-venn-diagram">
        {/* Background circles for overlap effects */}
        <div className="venn-overlap-bg venn-overlap-1"></div>
        <div className="venn-overlap-bg venn-overlap-2"></div>
        <div className="venn-overlap-bg venn-overlap-3"></div>
        <div className="venn-overlap-bg venn-overlap-4"></div>
        <div className="venn-overlap-bg venn-overlap-5"></div>
        <div className="venn-overlap-bg venn-overlap-6"></div>
        <div className="venn-overlap-bg venn-overlap-center"></div>

        {/* Main circles */}
        <div className="venn-circle venn-love">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What You Love</h4>
            <p className="venn-circle-text">{truncateText(love, 12)}</p>
          </div>
        </div>

        <div className="venn-circle venn-skill">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What You're Good At</h4>
            <p className="venn-circle-text">{truncateText(goodAt, 12)}</p>
          </div>
        </div>

        <div className="venn-circle venn-need">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What the World Needs</h4>
            <p className="venn-circle-text">{truncateText(worldNeeds, 12)}</p>
          </div>
        </div>

        <div className="venn-circle venn-value">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What You Can Be Paid For</h4>
            <p className="venn-circle-text">{truncateText(paidFor, 12)}</p>
          </div>
        </div>

        {/* Center Ikigai */}
        <div className="venn-center">
          <div className="venn-center-content">
            <div className="venn-center-icon">✨</div>
            <h3 className="venn-center-title">Your Ikigai</h3>
            {ikigai && (
              <p className="venn-center-text">{truncateText(ikigai, 20)}</p>
            )}
          </div>
        </div>

        {/* Overlap labels */}
        <div className="venn-label venn-label-passion">Passion</div>
        <div className="venn-label venn-label-mission">Mission</div>
        <div className="venn-label venn-label-vocation">Vocation</div>
        <div className="venn-label venn-label-profession">Profession</div>
      </div>
    </div>
  );
} 