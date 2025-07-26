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
    <div className="ikigai-venn-container">
      <div className="ikigai-venn-diagram">
        {/* Main Circles */}
        <div className="venn-circle venn-love" aria-label="What you love">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What You Love</h4>
            <p className="venn-circle-text">{love}</p>
          </div>
        </div>

        <div className="venn-circle venn-skill" aria-label="What you're good at">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What You're Good At</h4>
            <p className="venn-circle-text">{goodAt}</p>
          </div>
        </div>

        <div className="venn-circle venn-need" aria-label="What the world needs">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What the World Needs</h4>
            <p className="venn-circle-text">{worldNeeds}</p>
          </div>
        </div>

        <div className="venn-circle venn-value" aria-label="What you can be paid for">
          <div className="venn-circle-content">
            <h4 className="venn-circle-title">What You Can Be Paid For</h4>
            <p className="venn-circle-text">{paidFor}</p>
          </div>
        </div>

        {/* Intersection Labels */}
        <div className="venn-intersection venn-passion" aria-label="Passion: What you love and what you're good at">
          <span className="venn-intersection-label">Passion</span>
        </div>

        <div className="venn-intersection venn-profession" aria-label="Profession: What you're good at and what you can be paid for">
          <span className="venn-intersection-label">Profession</span>
        </div>

        <div className="venn-intersection venn-mission" aria-label="Mission: What the world needs and what you love">
          <span className="venn-intersection-label">Mission</span>
        </div>

        <div className="venn-intersection venn-vocation" aria-label="Vocation: What you can be paid for and what the world needs">
          <span className="venn-intersection-label">Vocation</span>
        </div>

        {/* Center Ikigai */}
        <div className="venn-center" aria-label="Your Ikigai">
          <div className="venn-center-content">
            <div className="venn-center-icon">✨</div>
            <h3 className="venn-center-title">Your Ikigai</h3>
            {ikigai && (
              <p className="venn-center-text">{ikigai}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}