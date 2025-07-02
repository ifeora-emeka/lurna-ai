import { ModuleAttributes } from './module.types';
import { LearningPathAttributes } from './learning-path.types';

export interface SetAttributes {
  id?: number;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  originalPrompt?: string;
  iconClass: string;
  color: string;
  createdBy: string;
  lastUsed?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  modules?: ModuleAttributes[];
  learningPath?: LearningPathAttributes;
}

export interface GeneratedSetData {
  name: string;
  description: string;
  keywords: string[];
  iconClass: string;
  color: string;
}

export interface CreateSetRequest {
  prompt: string;
}

export interface CreateSetResponse {
  message: string;
  data: SetAttributes;
}
