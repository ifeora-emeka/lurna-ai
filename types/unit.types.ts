export interface UnitAttributes {
  id?: number;
  name: string;
  description: string;
  index: number;
  setId: number;
  moduleId: number;
  createdBy: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UnitCreationAttributes {
  name: string;
  description: string;
  index: number;
  setId: number;
  moduleId: number;
  createdBy: string;
  tags: string[];
}

export interface CreateUnitRequest {
  name: string;
  description: string;
  tags: string[];
  setId: number;
  moduleId: number;
  index: number;
}

export interface CreateUnitResponse {
  message: string;
  data: UnitAttributes;
}
