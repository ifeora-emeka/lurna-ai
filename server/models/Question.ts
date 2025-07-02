import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { QuestionAttributes, QuestionCreationAttributes } from '../../types/question.types';

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  declare id: number;
  declare createdBy: string;
  declare setId: number;
  declare moduleId: number;
  declare unitId: number;
  declare content: string;
  declare type: string;
  declare environment: string;
  declare options: Array<{id: string; content: string; isCorrect: boolean}>;
  declare hint: string;

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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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
    hint: {
      type: DataTypes.TEXT,
      allowNull: true,
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
