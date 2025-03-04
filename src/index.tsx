import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

// Если вы хотите начать измерять производительность в вашем приложении,
// передайте функцию для регистрации результатов (например: reportWebVitals(console.log))
// или отправляйте данные в аналитику.
// reportWebVitals();