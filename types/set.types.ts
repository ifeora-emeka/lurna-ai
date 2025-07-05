import { ModuleAttributes } from './module.types';

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
  categoryId: number;
  subCategoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  modules?: ModuleAttributes[];
}

export interface GeneratedSetData {
  name: string;
  description: string;
  keywords: string[];
  iconClass: string;
  categorySlug: string;
  subCategorySlug: string;
}

export interface CreateSetRequest {
  prompt: string;
}

export interface CreateSetResponse {
  message: string;
  data: SetAttributes;
}
