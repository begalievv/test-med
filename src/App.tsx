import React, { useState, useEffect } from 'react';
import './App.css';
import './Loading.css';
import WelcomePage from './components/WelcomePage.tsx';
import TestPage from './components/TestPage.tsx';
import ContactForm from './components/ContactForm.tsx';
import ResultsPage from './components/ResultsPage.tsx';
import { QuestionData, ResultData, UserData, WelcomeContent } from './types';
import { generateGuid } from './utils/quidUtils.ts';
import { fetchTestContent } from './utils/apiService.ts';


const App: React.FC = () => {
    // State for application pages
    const [currentPage, setCurrentPage] = useState<'welcome' | 'test' | 'contact' | 'results' | 'loading'>('loading');
    
    // State for test data
    const [testQuestions, setTestQuestions] = useState<QuestionData[]>([]);
    const [resultRanges, setResultRanges] = useState<ResultData[]>([]);
    const [welcomeContent, setWelcomeContent] = useState<WelcomeContent | null>(null);
    
    // State for user progress
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [totalScore, setTotalScore] = useState(0);
    const [userData, setUserData] = useState<UserData>({ name: '', email: '', phone: '+996', telegram: '' });
    const [result, setResult] = useState<ResultData | null>(null);
    const [testGuid, setTestGuid] = useState<string>('');
    
    // State for loading status
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("Загрузка теста...");
    const [error, setError] = useState<string | null>(null);

    // Load all content from Google Sheets via n8n API
    useEffect(() => {
        const loadTestContent = async () => {
            try {
                setIsLoading(true);
                
                // Fetch all test content from n8n API which gets data from Google Sheets
                const content = await fetchTestContent();
                
                // Update state with fetched content
                setTestQuestions(content.questions);
                setResultRanges(content.results);
                setWelcomeContent(content.welcome);
                
                // Initialize answers array based on number of questions
                setAnswers(Array(content.questions.length).fill(0));
                
                // Generate unique test ID
                setTestGuid(generateGuid());
                
                // Set page to welcome after loading
                setCurrentPage('welcome');
                setIsLoading(false);
            } catch (err) {
                console.error('Error loading test content:', err);
                setError('Не удалось загрузить содержимое теста. Пожалуйста, обновите страницу или попробуйте позже.');
                setIsLoading(false);
            }
        };

        loadTestContent();
    }, []);

    const handleStartTest = () => {
        setCurrentPage('test');
    };

    const handleAnswerSelect = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = score;
        setAnswers(newAnswers);
        window.scrollTo(0, 0)
        // Move to next question or contact form if questions are finished
        if (currentQuestionIndex < testQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Calculate final score
            const finalScore = newAnswers.reduce((sum, score) => sum + score, 0);
            setTotalScore(finalScore);

            // Determine result based on score range
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
            // Call API to send data to n8n
            const response = await fetch('https://n8n.tech-demo.su/webhook/medical-test-results-local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testGuid: testGuid,
                    userData: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        telegram: formData.telegram || ""
                    },
                    testResults: {
                        answers,
                        totalScore,
                        result
                    }
                }),
            });

            if (response.ok) {
                // Navigate to results page
                setIsLoading(true);
                setLoadingMessage("Загрузка результатов...");
                setTimeout(() => {
                    setCurrentPage('results');
                    setIsLoading(false);
                }, 2000);
            } else {
                alert('Произошла ошибка при отправке результатов. Пожалуйста, попробуйте снова.');
            }
        } catch (error) {
            console.error('Error submitting results:', error);
            alert('Произошла ошибка при отправке результатов. Пожалуйста, попробуйте снова.');
        }
    };

    // Loading screen component
    const LoadingScreen = () => (
        <div className="loading-screen">
            <div className="loader"></div>
            <p>{loadingMessage}</p>
        </div>
    );

    // Error screen component
    const ErrorScreen = () => (
        <div className="error-screen">
            <h2>Ошибка загрузки</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
    );

    const renderCurrentPage = () => {
        if (isLoading) {
            return <LoadingScreen />;
        }

        if (error) {
            return <ErrorScreen />;
        }

        switch (currentPage) {
            case 'welcome':
                return welcomeContent ? (
                    <WelcomePage 
                        onStartClick={handleStartTest} 
                        content={welcomeContent}
                    />
                ) : <ErrorScreen />;
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
                return <ResultsPage 
                    userData={userData} 
                    totalScore={totalScore} 
                    resultData={result} 
                    testGuid={testGuid}
                />;
            default:
                return <LoadingScreen />;
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