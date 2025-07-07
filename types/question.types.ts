export interface QuestionOption {
  id: string;
  content: string;
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
  explanation?: string | null;
  hint?: string | null;
}

export interface CreateQuestionResponse {
  message: string;
  data: QuestionAttributes;
}

export type QuestionType = 
  | 'multiple_choice'
  | 'multiple_select'
  | 'true_false'
  | 'short_answer'
  | 'text'
  | 'matching'
  | 'fill_in_the_blank'
  | 'completion';
