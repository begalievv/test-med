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
  scenario: string;
  options: OptionData[];
  imageUrl?: string;
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
  phone: string;
  telegram?: string; // Опциональное поле
}

// Тип для объекта с полными результатами тестирования
export interface TestResults {
  testGuid: string; // Уникальный идентификатор теста
  userData: UserData;
  answers: number[];
  totalScore: number;
  result: ResultData | null;
  timestamp?: Date;
}

// Новый тип для контента приветственной страницы, загружаемого из Google Sheets
export interface WelcomeContent {
  title: string;
  subtitle: string;
  mainText: string;
  instructionsTitle: string;
  instructionsText: string[];
  benefitsTitle: string;
  benefitsList: string[];
  startButtonText: string;
}

// Тип для текстов формы контактов
export interface ContactFormContent {
  title: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  telegramLabel: string;
  buttonText: string;
  requiredText: string;
  validationMessages: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    phoneInvalid: string;
  };
}

// Тип для текстов страницы результатов
export interface ResultsPageContent {
  title: string;
  scoreLabel: string;
  yourDirectionText: string;
  suitableSpecialtiesText: string;
  yourProfileText: string;
  disclaimerText: string;
  telegramSectionTitle: string;
  telegramSectionDescription: string;
  telegramButtonText: string;
  resultIdText: string;
  telegramInfoText: string;
}