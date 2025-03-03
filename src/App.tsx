import React, { useState } from 'react';
import './App.css';
import WelcomePage from './components/WelcomePage.tsx';
import TestPage from './components/TestPage.tsx';
import ContactForm from './components/ContactForm.tsx';
import ResultsPage from './components/ResultsPage.tsx';
import { QuestionData, ResultData, UserData } from './types.ts';

// Данные теста, полученные из документа Word
const testQuestions: QuestionData[] = [
    {
        id: 1,
        category: "I. Рабочая среда и стиль работы",
        question: "Какой тип работы вам больше нравится?",
        options: [
            { id: 'a', text: "Работа руками, манипуляции, операции", score: 5 },
            { id: 'b', text: "Аналитическая работа, диагностика, работа с данными", score: 4 },
            { id: 'c', text: "Общение с пациентами, консультации, психология", score: 3 },
            { id: 'd', text: "Исследования, лабораторная работа, фундаментальная наука", score: 2 },
            { id: 'e', text: "Управление, организация, административная медицина", score: 1 },
        ]
    },
    {
        id: 2,
        category: "I. Рабочая среда и стиль работы",
        question: "Какой темп работы вам ближе?",
        options: [
            { id: 'a', text: "Быстрое принятие решений, экстренные ситуации", score: 5 },
            { id: 'b', text: "Средний темп, сбалансированная нагрузка", score: 4 },
            { id: 'c', text: "Размеренный ритм, глубокий анализ случая", score: 3 },
            { id: 'd', text: "Работа в тишине, без постоянного контакта с пациентами", score: 2 },
            { id: 'e', text: "Гибкий график, совмещение с научной деятельностью", score: 1 },
        ]
    },
    {
        id: 3,
        category: "I. Рабочая среда и стиль работы",
        question: "Какие пациенты вам интереснее?",
        options: [
            { id: 'a', text: "Экстренные случаи, травмы, тяжелые состояния", score: 5 },
            { id: 'b', text: "Хронические пациенты, требующие длительного лечения", score: 4 },
            { id: 'c', text: "Дети и подростки", score: 3 },
            { id: 'd', text: "Психосоматические и психологические проблемы", score: 2 },
            { id: 'e', text: "Вообще не пациенты, а коллеги (преподавание, администрирование)", score: 1 },
        ]
    },
    {
        id: 4,
        category: "II. Ваши способности и интересы",
        question: "Насколько важно для вас владение ручными навыками (операции, манипуляции)?",
        options: [
            { id: 'a', text: "Очень важно, я люблю работать руками", score: 5 },
            { id: 'b', text: "Важно, но больше интересует диагностика", score: 4 },
            { id: 'c', text: "Средне, мануальные навыки не основное", score: 3 },
            { id: 'd', text: "Не важно, я лучше анализирую, чем делаю руками", score: 2 },
            { id: 'e', text: "Мне важнее управление и стратегии", score: 1 },
        ]
    },
    {
        id: 5,
        category: "II. Ваши способности и интересы",
        question: "Какой тип информации вам проще запоминать?",
        options: [
            { id: 'a', text: "Визуальная (анатомия, изображения, рентген)", score: 5 },
            { id: 'b', text: "Логические связи, алгоритмы, патофизиология", score: 4 },
            { id: 'c', text: "Истории пациентов, психология, наблюдения", score: 3 },
            { id: 'd', text: "Структурированные данные, исследования", score: 2 },
            { id: 'e', text: "Административные процессы, протоколы", score: 1 },
        ]
    },
    {
        id: 6,
        category: "II. Ваши способности и интересы",
        question: "Что вам больше нравится в медицине?",
        options: [
            { id: 'a', text: "Лечить быстро и эффективно, спасать жизни", score: 5 },
            { id: 'b', text: "Устанавливать сложные диагнозы", score: 4 },
            { id: 'c', text: "Понимать и помогать человеку в целом", score: 3 },
            { id: 'd', text: "Исследовать и разрабатывать новые методы лечения", score: 2 },
            { id: 'e', text: "Организовывать, управлять, обучать", score: 1 },
        ]
    },
    {
        id: 7,
        category: "III. Ваш характер и стиль общения",
        question: "Как вы относитесь к стрессу?",
        options: [
            { id: 'a', text: "Люблю экстрим, он меня мотивирует", score: 5 },
            { id: 'b', text: "Могу работать в стрессе, но предпочитаю стабильность", score: 4 },
            { id: 'c', text: "Мне важен контакт с пациентом, стресс мешает", score: 3 },
            { id: 'd', text: "Я лучше анализирую в спокойной обстановке", score: 2 },
            { id: 'e', text: "Я вообще не хочу работать в стрессовых условиях", score: 1 },
        ]
    },
    {
        id: 8,
        category: "III. Ваш характер и стиль общения",
        question: "Какой формат общения вам ближе?",
        options: [
            { id: 'a', text: "Минимальный контакт, важен результат", score: 5 },
            { id: 'b', text: "Чёткие вопросы и логичный анализ", score: 4 },
            { id: 'c', text: "Эмпатия, длительное ведение пациента", score: 3 },
            { id: 'd', text: "Больше взаимодействия с коллегами, чем с пациентами", score: 2 },
            { id: 'e', text: "Я хочу больше работать с бумагами и процессами", score: 1 },
        ]
    }
];

// Интерпретация результатов
const resultRanges: ResultData[] = [
    {
        range: [30, 40],
        title: "Хирургические специальности",
        specialties: "общая хирургия, травматология, нейрохирургия, офтальмология, урология, гинекология",
        description: "Вы любите работать руками, принимать быстрые решения и видеть результат. Вам подходит динамичная, мануальная медицина с высокой степенью ответственности."
    },
    {
        range: [20, 29],
        title: "Диагностические специальности",
        specialties: "терапия, кардиология, гастроэнтерология, эндокринология, инфекционные болезни, неврология",
        description: "Вам важен анализ и понимание заболеваний. Вы любите системность, умеете глубоко разбираться в клинических случаях. Вам подходит работа с хроническими пациентами и сложными диагностическими задачами."
    },
    {
        range: [15, 19],
        title: "Педиатрия, семейная медицина, психиатрия",
        specialties: "педиатрия, семейная медицина, психиатрия",
        description: "Вы цените контакт с пациентами, длительное ведение и эмпатию. Вам подходят специальности, где важна психологическая работа, индивидуальный подход и ведение пациентов на протяжении всей жизни."
    },
    {
        range: [10, 14],
        title: "Фундаментальные и лабораторные науки",
        specialties: "патологическая анатомия, микробиология, генетика, фармакология",
        description: "Вы любите исследования, анализ данных, вас интересует природа болезней на глубоком уровне. Вам подходит работа в лаборатории, научные разработки, преподавание."
    },
    {
        range: [5, 9],
        title: "Административная медицина, управление, преподавание",
        specialties: "медицинский менеджмент, организация здравоохранения, образовательная деятельность",
        description: "Вы ориентированы на стратегию, управление процессами, оптимизацию системы здравоохранения. Вам подойдут специальности, связанные с медицинским менеджментом, организацией здравоохранения, образовательной деятельностью."
    }
];

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'welcome' | 'test' | 'contact' | 'results'>('welcome');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>(Array(testQuestions.length).fill(0));
    const [totalScore, setTotalScore] = useState(0);
    const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
    const [result, setResult] = useState<ResultData | null>(null);

    const handleStartTest = () => {
        setCurrentPage('test');
    };

    const handleAnswerSelect = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = score;
        setAnswers(newAnswers);

        // Переход к следующему вопросу или к форме контактов, если вопросы закончились
        if (currentQuestionIndex < testQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Подсчет общего балла
            const finalScore = newAnswers.reduce((sum, score) => sum + score, 0);
            setTotalScore(finalScore);

            // Определение результата на основе диапазона баллов
            const matchedResult = resultRanges.find(
                range => finalScore >= range.range[0] && finalScore <= range.range[1]
            );

            setResult(matchedResult || null);
            setCurrentPage('contact');
        }
    };

    const handleContactSubmit = async (formData: UserData) => {
        setUserData(formData);

        try {
            // Здесь будет вызов API для отправки данных в n8n
            // Это заглушка для демонстрации
            const response = await fetch('https://your-n8n-endpoint.com/webhook/test-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userData: formData,
                    testResults: {
                        answers,
                        totalScore,
                        result
                    }
                }),
            });

            if (response.ok) {
                // Переход на страницу результатов
                setCurrentPage('results');
            } else {
                alert('Произошла ошибка при отправке результатов. Пожалуйста, попробуйте снова.');
            }
        } catch (error) {
            console.error('Error submitting results:', error);
            alert('Произошла ошибка при отправке результатов. Пожалуйста, попробуйте снова.');
        }
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'welcome':
                return <WelcomePage onStartClick={handleStartTest} />;
            case 'test':
                return (
                    <TestPage
                        question={testQuestions[currentQuestionIndex]}
                        currentQuestion={currentQuestionIndex + 1}
                        totalQuestions={testQuestions.length}
                        onAnswerSelect={handleAnswerSelect}
                    />
                );
            case 'contact':
                return <ContactForm onSubmit={handleContactSubmit} />;
            case 'results':
                return <ResultsPage userData={userData} totalScore={totalScore} resultData={result} />;
            default:
                return <WelcomePage onStartClick={handleStartTest} />;
        }
    };

    return (
        <div className="app">
            <div className="container">
                {renderCurrentPage()}
            </div>
        </div>
    );
};

export default App;