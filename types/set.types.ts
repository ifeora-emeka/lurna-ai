export interface SetAttributes {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModuleData {
  name: string;
  description?: string;
}

export interface GeneratedModules {
  modules: ModuleData[];
}

export interface CreateSetRequest {
  prompt: string;
}

export interface CreateSetResponse {
  message: string;
  data: GeneratedModules;
}
