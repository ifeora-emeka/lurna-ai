import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SubCategoryAttributes, SubCategoryCreationAttributes } from '../../types/subcategory.types';

export class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare categoryId: number;
  declare color: string;
  declare iconClass: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iconClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sub_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default SubCategory;
