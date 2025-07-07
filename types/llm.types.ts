export type LLMNextSteps = {
  messageForStudent: string;
  difficultyLevel: 'easy' | 'medium' | 'hard',
  canMoveForward: boolean;
  isTimed: boolean;
  areasToTackle: string[];
  totalUnitAssessment?:number;
}