import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { CategoryAttributes, CategoryCreationAttributes } from '../../types/category.types';

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare color: string;
  declare iconClass: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Category.init(
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
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iconClass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'icon_class',
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Category;
