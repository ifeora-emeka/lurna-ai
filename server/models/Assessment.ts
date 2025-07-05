import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { AssessmentAttributes, AssessmentCreationAttributes } from '../../types/assessment.types';

export class Assessment extends Model<AssessmentAttributes, AssessmentCreationAttributes> implements AssessmentAttributes {
  declare id: number;
  declare createdBy: string;
  declare setId: number;
  declare moduleId: number;
  declare unitId: number;
  declare title: string;
  declare description: string;
  declare type: string;
  declare difficultyLevel: string;
  declare timeLimit: number | null;
  declare categoryId: number;
  declare subCategoryId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Assessment.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficultyLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'difficulty_level',
      validate: {
        isIn: [['easy', 'medium', 'hard']]
      }
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'time_limit',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sub_category_id',
    },
  },
  {
    sequelize,
    tableName: 'assessments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Assessment;
