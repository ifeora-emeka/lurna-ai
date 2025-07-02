export interface LearningPathAttributes {
  id?: number;
  setId: number;
  createdBy: string;
  currentModuleId: number | null;
  currentUnitId: number | null;
  lastUsed: Date;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LearningPathCreationAttributes {
  setId: number;
  createdBy: string;
  currentModuleId?: number | null;
  currentUnitId?: number | null;
  lastUsed?: Date;
  isCompleted?: boolean;
}

export interface CreateLearningPathRequest {
  setId: number;
}

export interface CreateLearningPathResponse {
  message: string;
  data: LearningPathAttributes;
}
