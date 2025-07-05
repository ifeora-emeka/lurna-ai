import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SetAttributes } from '../../types/set.types';

export class Set extends Model<SetAttributes> implements SetAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare description: string;
  declare keywords: string[];
  declare originalPrompt: string;
  declare iconClass: string;
  declare color: string;
  declare createdBy: string;
  declare lastUsed: Date;
  declare categoryId: number;
  declare subCategoryId: number;
}

Set.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    originalPrompt: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'original_prompt',
    },
    iconClass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'icon_class',
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'created_by',
    },
    lastUsed: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_used',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'sub_category_id',
    },
  },
  {
    sequelize,
    tableName: 'sets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Set;
