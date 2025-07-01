import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { ModuleAttributes, ModuleCreationAttributes } from '../../types/module.types';
// Imports removed to solve circular dependency

export class Module extends Model<ModuleAttributes, ModuleCreationAttributes> implements ModuleAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare description: string;
  declare set: any;
  declare createdBy: string;
  declare tags: string[];
  declare index: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Module.init(
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
    set: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'modules',
    timestamps: true,
  }
);

export default Module;
