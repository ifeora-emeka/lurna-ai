import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SetAttributes } from '../../types/set.types';

export class Set extends Model<SetAttributes> implements SetAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sets',
    timestamps: true,
  }
);

export default Set;
