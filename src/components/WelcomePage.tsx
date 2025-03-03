import React from 'react';
import './WelcomePage.css';

interface WelcomePageProps {
  onStartClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartClick }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Тест: "Какая медицинская специальность вам подходит?"</h1>
        <h2 className="subtitle">Для студентов медицинских ВУЗов, помогающий определить склонность к разным направлениям медицины</h2>
        
        <div className="welcome-content">
          <p>
            Выбор медицинской специальности - важный шаг в карьере каждого врача. 
            Этот тест поможет вам определить, какое направление медицины лучше всего 
            соответствует вашим склонностям, интересам и личностным качествам.
          </p>
          
          <div className="instructions">
            <h3>Инструкция:</h3>
            <p>
              Отвечайте на вопросы, выбирая <strong>только один</strong> наиболее 
              подходящий для вас вариант. В конце теста автоматически выводится 
              сумма баллов, и Вы узнаете, какая медицинская специальность вам ближе.
            </p>
            <p>
              Тест состоит из 8 вопросов и займет примерно 5-7 минут.
            </p>
          </div>
          
          <div className="test-benefits">
            <h3>Что вы получите:</h3>
            <ul>
              <li>Определение вашей предрасположенности к конкретным медицинским специальностям</li>
              <li>Подробный PDF-отчет с анализом результатов</li>
              <li>Персональные рекомендации по развитию в выбранном направлении</li>
            </ul>
          </div>
        </div>
        
        <button className="start-button" onClick={onStartClick}>
          Начать тестирование
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;