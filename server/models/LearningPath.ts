import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { LearningPathAttributes, LearningPathCreationAttributes } from '../../types/learning-path.types';

export class LearningPath extends Model<LearningPathAttributes, LearningPathCreationAttributes> implements LearningPathAttributes {
  declare id: number;
  declare setId: number;
  declare createdBy: string;
  declare currentModuleId: number | null;
  declare currentUnitId: number | null;
  declare lastUsed: Date;
  declare isCompleted: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

LearningPath.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    setId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'set_id',
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentModuleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'current_module_id',
    },
    currentUnitId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'current_unit_id',
    },
    lastUsed: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'learning_paths',
    timestamps: true,
  }
);

export default LearningPath;
