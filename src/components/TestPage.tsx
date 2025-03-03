import React from 'react';
import { QuestionData } from '../types';
import './TestPage.css';

interface TestPageProps {
  question: QuestionData;
  currentQuestion: number;
  totalQuestions: number;
  onAnswerSelect: (score: number) => void;
}

const TestPage: React.FC<TestPageProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswerSelect
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="test-page">
      <div className="test-card">
        <div className="progress-container">
          <div className="progress-text">Вопрос {currentQuestion} из {totalQuestions}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="category-label">{question.category}</div>
        
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-list">
          {question.options.map((option) => (
            <button
              key={option.id}
              className="option-button"
              onClick={() => onAnswerSelect(option.score)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;