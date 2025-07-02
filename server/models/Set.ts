import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SetAttributes } from '../../types/set.types';
// Removed import

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
    },
    iconClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastUsed: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'sets',
    timestamps: true,
  }
);

export default Set;
