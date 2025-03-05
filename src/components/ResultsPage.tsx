import React, { useEffect, useState } from 'react';
import { ResultData, UserData, ResultsPageContent } from '../types';
import './ResultsPage.css';

interface ResultsPageProps {
  userData: UserData;
  totalScore: number;
  resultData: ResultData | null;
  testGuid: string;
  content?: ResultsPageContent; // Dynamic content from Google Sheets
}

const ResultsPage: React.FC<ResultsPageProps> = ({ 
  userData, 
  totalScore, 
  resultData, 
  testGuid,
  content 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  
  // Default content if not provided via props
  const defaultContent: ResultsPageContent = {
    title: 'Ваши результаты',
    scoreLabel: 'баллов',
    yourDirectionText: 'Ваше направление:',
    suitableSpecialtiesText: 'Подходящие специальности:',
    yourProfileText: 'Ваш профиль:',
    disclaimerText: 'Этот тест не является финальным руководством, но он помогает понять вашу предрасположенность к определенным видам специальностей в медицине.',
    telegramSectionTitle: 'Получите подробный анализ в Telegram',
    telegramSectionDescription: 'Отсканируйте QR-код для получения детального результата в нашем Telegram боте:',
    telegramButtonText: 'Открыть в Telegram',
    resultIdText: 'Ваш ID результата:',
    telegramInfoText: 'Наш бот предоставит вам подробную информацию о подходящих специальностях, рекомендации по развитию и ответит на ваши вопросы.'
  };

  // Use provided content or default
  const resultsContent = content || defaultContent;
  
  // Telegram bot URL with GUID
  const telegramBotUrl = `https://t.me/medspecialitybot?start=${testGuid}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(telegramBotUrl)}`;

  useEffect(() => {
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setDownloadComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate PDF download
    setTimeout(() => {
      setIsDownloading(false);
      alert('PDF-файл с результатами успешно скачан.');
      
      // In a real app, code for downloading PDF would go here
      // For example:
      // const pdfURL = 'https://your-backend.com/generate-pdf?resultId=xyz123';
      // window.open(pdfURL, '_blank');
    }, 1500);
  };

  if (!resultData) {
    return (
      <div className="results-page">
        <div className="results-card">
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось определить результат. Пожалуйста, попробуйте пройти тест снова.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-card">
        <div className="results-header">
          <h2>{resultsContent.title}</h2>
          <p className="user-name">Здравствуйте, {userData.name}!</p>
        </div>
        
        <div className="score-section">
          <div className="score-circle">
            <span className="score-value">{totalScore}</span>
            <span className="score-label">{resultsContent.scoreLabel}</span>
          </div>
        </div>
        
        {/* <div className="results-content">
          <h3>{resultsContent.yourDirectionText}</h3>
          <div className="result-title">{resultData.title}</div>
          
          <div className="specialties">
            <h4>{resultsContent.suitableSpecialtiesText}</h4>
            <p>{resultData.specialties}</p>
          </div>
          
          <div className="result-description">
            <h4>{resultsContent.yourProfileText}</h4>
            <p>{resultData.description}</p>
          </div>
          
          <div className="disclaimer">
            <p>{resultsContent.disclaimerText}</p>
          </div>
        </div> */}
        
        {/* Telegram Bot QR Code section */}
        <div className="telegram-section">
          <h4>{resultsContent.telegramSectionTitle}</h4>
          <p>{resultsContent.telegramSectionDescription}</p>
          <div className="qr-code-container">
            <img src={qrCodeUrl} alt="QR-код для Telegram бота" className="qr-code" />
          </div>
          <div className="result-id">
            <p>{resultsContent.resultIdText} <span className="guid-value">{testGuid}</span></p>
          </div>
          <p className="telegram-info">{resultsContent.telegramInfoText}</p>
          <a href={telegramBotUrl} target="_blank" rel="noopener noreferrer" className="telegram-button">
            {resultsContent.telegramButtonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;