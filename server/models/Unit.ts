import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { UnitAttributes, UnitCreationAttributes } from '../../types/unit.types';
// Imports removed to solve circular dependency

export class Unit extends Model<UnitAttributes, UnitCreationAttributes> implements UnitAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare index: number;
  declare setId: number;
  declare moduleId: number;
  declare createdBy: string;
  declare tags: string[];

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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    setId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'set_id',
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'module_id',
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
  },
  {
    sequelize,
    tableName: 'units',
    timestamps: true,
  }
);

export default Unit;
