import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { ModuleAttributes, ModuleCreationAttributes } from '../../types/module.types';

export class Module extends Model<ModuleAttributes, ModuleCreationAttributes> implements ModuleAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare description: string;
  declare setId: number;
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
    setId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'set_id',
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'created_by',
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Module;
