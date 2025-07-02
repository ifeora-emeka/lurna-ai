import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { AssessmentResultAttributes, AssessmentResultCreationAttributes } from '../../types/assessment-result.types';

export class AssessmentResult extends Model<AssessmentResultAttributes, AssessmentResultCreationAttributes> implements AssessmentResultAttributes {
  declare id: number;
  declare createdBy: string;
  declare setId: number;
  declare moduleId: number;
  declare unitId: number;
  declare result: Array<{
    question: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    isCorrect: boolean;
  }>;
  declare advice: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

AssessmentResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'created_by',
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
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'unit_id',
    },
    result: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    advice: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'assessment_results',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default AssessmentResult;
