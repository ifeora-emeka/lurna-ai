export interface AssessmentResultAttributes {
  id?: number;
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  result: Array<{
    question: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    isCorrect: boolean;
  }>;
  advice: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssessmentResultCreationAttributes {
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  result: Array<{
    question: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    isCorrect: boolean;
  }>;
  advice?: string;
}

export interface CreateAssessmentResultRequest {
  setId: number;
  moduleId: number;
  unitId: number;
  result: Array<{
    questionId: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    isCorrect: boolean;
  }>;
  advice?: string;
}

export interface CreateAssessmentResultResponse {
  message: string;
  data: AssessmentResultAttributes;
}
