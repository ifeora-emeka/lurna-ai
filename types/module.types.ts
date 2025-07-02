import { UnitAttributes } from './unit.types';

export interface ModuleAttributes {
  id?: number;
  name: string;
  slug: string;
  description: string;
  setId: number;
  createdBy: string;
  tags: string[];
  index: number;
  createdAt?: Date;
  updatedAt?: Date;
  units?: UnitAttributes[];
}

export interface ModuleCreationAttributes {
  name: string;
  slug: string;
  description: string;
  setId: number;
  createdBy: string;
  tags: string[];
  index: number;
}

export interface CreateModuleRequest {
  name: string;
  description: string;
  setId: number;
  tags: string[];
  index: number;
}

export interface CreateModuleResponse {
  message: string;
  data: ModuleAttributes;
}
