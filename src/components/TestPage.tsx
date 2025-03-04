import React from 'react';
import { QuestionData } from '../types';
import './TestPage.css';

interface TestPageProps {
  question: QuestionData;
  currentQuestion: number;
  totalQuestions: number;
  onAnswerSelect: (score: number) => void;
  staticText?: {
    questionLabel: string;
    questionOfTotal: string;
  };
}

const TestPage: React.FC<TestPageProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswerSelect,
  staticText
}) => {
  // Default text if not provided
  const defaultText = {
    questionLabel: 'Вопрос',
    questionOfTotal: 'из'
  };

  // Use provided text or default
  const text = staticText || defaultText;

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="test-page">
      <div className="test-card">
        <div className="progress-container">
          <div className="progress-text">
            {text.questionLabel} {currentQuestion} {text.questionOfTotal} {totalQuestions}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="category-label">{question.category}</div>

        <div className="question-container">
          <h2 className="question-text">
            <span className="question-number">{currentQuestion}.</span> {question.question}
          </h2>
          <div className="question-scenario">
            {question.scenario}
          </div>
        </div>

        {question.imageUrl && (
          <div className="question-image-container">
            <img
              src={question.imageUrl}
              alt={`Иллюстрация к вопросу ${currentQuestion}`}
              className="question-image"
            />
          </div>
        )}

        <div className="options-list">
          {question.options?.map((option, index) => (
            <button
              key={option.id}
              className="option-button"
              onClick={() => onAnswerSelect(option.score)}
            >
              <span className="option-number">{index + 1}.</span> {option.text}
              <div className="option-description">{option.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;