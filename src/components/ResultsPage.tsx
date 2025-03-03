import React, { useEffect, useState } from 'react';
import { ResultData, UserData } from '../types';
import './ResultsPage.css';

interface ResultsPageProps {
  userData: UserData;
  totalScore: number;
  resultData: ResultData | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ userData, totalScore, resultData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    // Имитация загрузки PDF файла
    const timer = setTimeout(() => {
      setDownloadComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Имитация загрузки PDF-файла
    setTimeout(() => {
      setIsDownloading(false);
      alert('PDF-файл с результатами успешно скачан.');
      
      // В реальном приложении здесь будет код для скачивания PDF
      // Например:
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
          <h2>Ваши результаты</h2>
          <p className="user-name">Здравствуйте, {userData.name}!</p>
        </div>
        
        <div className="score-section">
          <div className="score-circle">
            <span className="score-value">{totalScore}</span>
            <span className="score-label">баллов</span>
          </div>
        </div>
        
        <div className="results-content">
          <h3>Ваше направление:</h3>
          <div className="result-title">{resultData.title}</div>
          
          <div className="specialties">
            <h4>Подходящие специальности:</h4>
            <p>{resultData.specialties}</p>
          </div>
          
          <div className="result-description">
            <h4>Ваш профиль:</h4>
            <p>{resultData.description}</p>
          </div>
          
          <div className="disclaimer">
            <p>Этот тест не является финальным руководством, но он помогает понять вашу предрасположенность к определенным видам специальностей в медицине.</p>
          </div>
        </div>
        
        <div className="pdf-section">
          <div className="pdf-info">
            <h4>Полный отчет в PDF</h4>
            <p>Подробный отчет был отправлен на адрес: <strong>{userData.email}</strong></p>
            <p>Вы также можете скачать его прямо сейчас:</p>
          </div>
          
          <button 
            className={`download-button ${isDownloading ? 'loading' : ''}`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Загрузка...' : 'Скачать отчет'}
          </button>
          
          {downloadComplete && (
            <div className="email-notification">
              <p>✓ PDF также отправлен на ваш email</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;