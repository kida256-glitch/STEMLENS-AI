// User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

// Object Recognition
export interface ObjectRecognition {
  object_name: string;
  category: string;
  stem_concepts: string[];
}

// STEM Concept
export interface STEMConcept {
  title: string;
  explanation: string;
  example: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Lesson Content
export interface LessonContent {
  objectDescription: string;
  physics: STEMConcept[];
  mathematics: STEMConcept[];
  engineering: STEMConcept[];
  technology: STEMConcept[];
  realWorldApplications: string[];
}

// Quiz Question
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Quiz Result
export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: {
    questionIndex: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  completedAt: Date;
}

// Analysis Record
export interface AnalysisRecord {
  id: string;
  userId: string;
  imageUrl: string;
  objectRecognition: ObjectRecognition;
  lessonContent: LessonContent;
  quizQuestions: QuizQuestion[];
  quizResult?: QuizResult;
  createdAt: Date;
}

// User Statistics
export interface UserStatistics {
  totalAnalyses: number;
  totalQuizzes: number;
  averageScore: number;
  recentAnalyses: AnalysisRecord[];
}

// Theme
export type Theme = 'light' | 'dark' | 'system';
