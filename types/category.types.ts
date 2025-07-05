export interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  color: string;
  iconClass: string;
  
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CategoryCreationAttributes {
  name: string;
  slug: string;
  color: string;
  iconClass: string;
}
