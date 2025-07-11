import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { QuestionAttributes, QuestionCreationAttributes } from '../../types/question.types';

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  declare id: number;
  declare createdBy: string;
  declare setId: number;
  declare moduleId: number;
  declare unitId: number;
  declare assessmentId: number;
  declare content: string;
  declare type: string;
  declare environment: string;
  declare options: Array<{id: string; content: string}>;
  declare explanation: string | null;
  declare hint: string | null;
  declare categoryId: number;
  declare subCategoryId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Question.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['multiple_choice', 'multiple_select', 'true_false', 'short_answer', 'text', 'matching', 'fill_in_the_blank', 'completion']]
      }
    },
    environment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default',
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hint: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: 'questions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Question;
