import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { AssessmentResultAttributes, AssessmentResultCreationAttributes } from '../../types/assessment-result.types';

export class AssessmentResult extends Model<AssessmentResultAttributes, AssessmentResultCreationAttributes> implements AssessmentResultAttributes {
  declare id: number;
  declare createdBy: string;
  declare setId: number;
  declare moduleId: number;
  declare unitId: number;
  declare assessmentId: number;
  declare result: Array<{
    question: number;
    correctAnswerText: string;
    correctOptionsIDs: string[];
    userAnswers: string[];
    userSelectedOptions: string[];
    isCorrect: boolean;
    isUnanswered: boolean;
  }>;
  declare advice: string;
  declare difficultyLevel: string;
  declare isCompleted: boolean;
  declare timeStarted?: Date | null;
  declare categoryId: number;
  declare subCategoryId: number;

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
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'assessment_id',
    },
    result: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    advice: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    difficultyLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'difficulty_level',
      validate: {
        isIn: [['easy', 'medium', 'hard']]
      }
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_completed',
    },
    timeStarted: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_started',
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
    tableName: 'assessment_results',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default AssessmentResult;
