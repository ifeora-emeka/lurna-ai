export interface QuestionOption {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface QuestionAttributes {
  id?: number;
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  assessmentId: number;
  content: string;
  type: string;
  environment: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string | null;
  hint: string | null;
  categoryId: number;
  subCategoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionCreationAttributes {
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  assessmentId: number;
  content: string;
  type: string;
  environment?: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation?: string | null;
  hint?: string | null;
  categoryId: number;
  subCategoryId: number;
}

export interface CreateQuestionRequest {
  setId: number;
  moduleId: number;
  unitId: number;
  assessmentId: number;
  content: string;
  type: string;
  environment?: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation?: string | null;
  hint?: string | null;
}

export interface CreateQuestionResponse {
  message: string;
  data: QuestionAttributes;
}

export type QuestionType = 
  | 'multiple-choice'
  | 'multiple-response'
  | 'true-false'
  | 'matching'
  | 'fill-in-the-blank'
  | 'completion';
