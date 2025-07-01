export interface UnitAttributes {
  id?: number;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  createdBy: string;
  set: number;
  module: number;
  index: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UnitCreationAttributes {
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  createdBy: string;
  set: number;
  module: number;
  index: number;
}

export interface CreateUnitRequest {
  name: string;
  description: string;
  keywords: string[];
  setId: number;
  moduleId: number;
  index: number;
}

export interface CreateUnitResponse {
  message: string;
  data: UnitAttributes;
}
