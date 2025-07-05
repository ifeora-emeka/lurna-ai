export interface SubCategoryAttributes {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  color: string;
  iconClass: string;
  
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface SubCategoryCreationAttributes {
  name: string;
  slug: string;
  categoryId: number;
  color: string;
  iconClass: string;
}
