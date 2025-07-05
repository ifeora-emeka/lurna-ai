export interface AssessmentAttributes {
  id?: number;
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  title: string;
  description: string;
  type: string;
  difficultyLevel: string;
  timeLimit?: number | null;
  categoryId: number;
  subCategoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssessmentCreationAttributes {
  createdBy: string;
  setId: number;
  moduleId: number;
  unitId: number;
  title: string;
  description: string;
  type: string;
  difficultyLevel: string;
  timeLimit?: number | null;
  categoryId: number;
  subCategoryId: number;
}

export interface CreateAssessmentRequest {
  setId: number;
  moduleId: number;
  unitId: number;
  title: string;
  description: string;
  type: string;
  difficultyLevel: string;
  timeLimit?: number | null;
}

export interface CreateAssessmentResponse {
  message: string;
  data: AssessmentAttributes;
}
