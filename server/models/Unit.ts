import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { UnitAttributes, UnitCreationAttributes } from '../../types/unit.types';
// Imports removed to solve circular dependency

export class Unit extends Model<UnitAttributes, UnitCreationAttributes> implements UnitAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare description: string;
  declare keywords: string[];
  declare createdBy: string;
  declare set: any;
  declare module: number;
  declare index: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Unit.init(
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
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    set: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    module: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'units',
    timestamps: true,
  }
);

export default Unit;
