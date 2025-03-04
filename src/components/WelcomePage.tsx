import React from 'react';
import './WelcomePage.css';
import { WelcomeContent } from '../types';

interface WelcomePageProps {
  onStartClick: () => void;
  content: WelcomeContent;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartClick, content }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>{content.title}</h1>
        <h2 className="subtitle">{content.subtitle}</h2>
        
        <div className="welcome-content">
          <p>{content.mainText}</p>
          
          <div className="instructions">
            <h3>{content.instructionsTitle}</h3>
            {content.instructionsText.map((paragraph, index) => (
              <p key={`instruction-${index}`} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          
          <div className="test-benefits">
            <h3>{content.benefitsTitle}</h3>
            <ul>
              {content.benefitsList.map((benefit, index) => (
                <li key={`benefit-${index}`} dangerouslySetInnerHTML={{ __html: benefit }} />
              ))}
            </ul>
          </div>
        </div>
        
        <button className="start-button" onClick={onStartClick}>
          {content.startButtonText}
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;