// src/utils/apiService.ts
import { QuestionData, ResultData, WelcomeContent } from '../types';

// Interface for the complete test content from the API
interface TestContent {
  welcome: WelcomeContent;
  questions: QuestionData[];
  results: ResultData[];
}

/**
 * Fetches all test content from n8n API which pulls data from Google Sheets
 * @returns All content for the test application: welcome text, questions, and results
 */
export const fetchTestContent = async (): Promise<TestContent> => {
  try {
    // Call n8n endpoint that fetches data from Google Sheets
    const response = await fetch('https://n8n.tech-demo.su/webhook/medical-test-content');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate received data
    if (!data.questions || !data.result) {
      throw new Error('Received incomplete data from the API');
    }
    
    if (data.questions.length === 0) {
      throw new Error('No questions received from the API');
    }
    
    // Process and format the data as needed
    return {
      welcome: data.welcome,
      questions: data.questions.map((q: any) => ({
        ...q,
        // Ensure options are properly formatted
        options: Array.isArray(q.options) ? q.options : []
      })),
      results: data.result
    };
    
  } catch (error) {
    console.error('Error fetching test content:', error);
    throw error;
  }
};

/**
 * Submits test results to n8n endpoint which can store them in Google Sheets
 * @param resultData The complete test result data to submit
 * @returns Response from the API
 */
export const submitTestResults = async (resultData: any) => {
  try {
    const response = await fetch('https://n8n.tech-demo.su/webhook/medical-test-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting test results:', error);
    throw error;
  }
};