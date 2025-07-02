export interface AssessmentAttributes {
  id?: number;
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  title: string;
  summary: string;
  isTimed: boolean;
  difficultyLevel: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssessmentCreationAttributes {
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  title: string;
  summary: string;
  isTimed?: boolean;
  difficultyLevel: string;
}

export interface CreateAssessmentRequest {
  setId: number;
  moduleId: number;
  unitId: number;
  title: string;
  summary: string;
  isTimed?: boolean;
  difficultyLevel: string;
}

export interface CreateAssessmentResponse {
  message: string;
  data: AssessmentAttributes;
}
