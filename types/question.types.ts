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
  content: string;
  type: string;
  environment: string;
  options: QuestionOption[];
  hint: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionCreationAttributes {
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  content: string;
  type: string;
  environment?: string;
  options: QuestionOption[];
  hint?: string;
}

export interface CreateQuestionRequest {
  setId: number;
  moduleId: number;
  unitId: number;
  content: string;
  type: string;
  environment?: string;
  options: QuestionOption[];
  hint?: string;
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
