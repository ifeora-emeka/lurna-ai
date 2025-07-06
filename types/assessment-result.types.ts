export interface AssessmentResultAttributes {
  id?: number;
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  assessmentId: number;
  result: Array<{
    question: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    userAnswers: string[];
    userSelectedOptions: string[];
    isCorrect: boolean;
    isUnanswered: boolean;
  }>;
  advice: string;
  difficultyLevel: string;
  isCompleted: boolean;
  categoryId?: number;
  subCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssessmentResultCreationAttributes {
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  assessmentId: number;
  result: Array<{
    question: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    userAnswers: string[];
    userSelectedOptions: string[];
    isCorrect: boolean;
    isUnanswered: boolean;
  }>;
  advice?: string;
  difficultyLevel: string;
  isCompleted?: boolean;
  categoryId?: number;
  subCategoryId?: number;
}

export interface CreateAssessmentResultRequest {
  setId: number;
  moduleId: number;
  unitId: number;
  assessmentId: number;
  result: Array<{
    questionId: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    userAnswers: string[];
    userSelectedOptions: string[];
    isCorrect: boolean;
    isUnanswered: boolean;
  }>;
  advice?: string;
  difficultyLevel: string;
  isCompleted?: boolean;
}

export interface CreateAssessmentResultResponse {
  message: string;
  data: AssessmentResultAttributes;
}
