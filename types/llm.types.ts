export type LLMNextSteps = {
  messageForStudent: string;
  difficultyLevel: null | 'easy' | 'medium' | 'hard',
  canMoveForward: boolean;
  isTimed: boolean;
  areasToTackle: string[];
  totalUnitAssessment?:number;
}