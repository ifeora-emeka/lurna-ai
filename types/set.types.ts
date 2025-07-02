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
