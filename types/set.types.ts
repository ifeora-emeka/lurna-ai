export interface SetAttributes {
  id?: number;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  originalPrompt?: string;
  iconClass: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GeneratedSetData {
  name: string;
  description: string;
  keywords: string[];
  iconClass: string;
}

export interface CreateSetRequest {
  prompt: string;
}

export interface CreateSetResponse {
  message: string;
  data: SetAttributes;
}
