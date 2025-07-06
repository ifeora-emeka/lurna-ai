export interface AssessmentAnswer {
  questionId: number;
  selectedOptions?: string[];
  textAnswer?: string;
}

export interface EvaluatedAnswer {
  question: number;
  correctAnswerText: string;
  correctOptionsIDs: string[];
  userAnswers: string[];
  userSelectedOptions: string[];
  isCorrect: boolean;
  isUnanswered: boolean;
}

export interface AssessmentEvaluation {
  evaluatedAnswers: EvaluatedAnswer[];
  advice: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}
