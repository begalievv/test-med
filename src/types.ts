// Типы данных для приложения

// Тип для варианта ответа
export interface OptionData {
    id: string;
    text: string;
    score: number;
  }
  
  // Тип для вопроса
  export interface QuestionData {
    id: number;
    category: string;
    question: string;
    options: OptionData[];
  }
  
  // Тип для диапазона результатов
  export interface ResultData {
    range: [number, number]; // Минимальный и максимальный балл для этого результата
    title: string;
    specialties: string;
    description: string;
  }
  
  // Тип для данных пользователя
  export interface UserData {
    name: string;
    email: string;
  }
  
  // Тип для объекта с полными результатами тестирования
  export interface TestResults {
    userData: UserData;
    answers: number[];
    totalScore: number;
    result: ResultData | null;
    timestamp?: Date;
  }