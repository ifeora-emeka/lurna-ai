import { Set } from './Set';
import { Module } from './Module';
import { Unit } from './Unit';
import { LearningPath } from './LearningPath';
import { Assessment } from './Assessment';
import { Question } from './Question';
import { AssessmentResult } from './AssessmentResult';
import User from './User';
import { Category } from './Category';
import { SubCategory } from './SubCategory';

export function initializeAssociations() {
  // Category associations
  Category.hasMany(SubCategory, { foreignKey: 'categoryId', as: 'subCategories' });
  Category.hasMany(Set, { foreignKey: 'categoryId', as: 'sets' });
  Category.hasMany(Assessment, { foreignKey: 'categoryId', as: 'assessments' });
  Category.hasMany(Question, { foreignKey: 'categoryId', as: 'questions' });
  Category.hasMany(AssessmentResult, { foreignKey: 'categoryId', as: 'assessmentResults' });
  
  // SubCategory associations
  SubCategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  SubCategory.hasMany(Set, { foreignKey: 'subCategoryId', as: 'sets' });
  SubCategory.hasMany(Assessment, { foreignKey: 'subCategoryId', as: 'assessments' });
  SubCategory.hasMany(Question, { foreignKey: 'subCategoryId', as: 'questions' });
  SubCategory.hasMany(AssessmentResult, { foreignKey: 'subCategoryId', as: 'assessmentResults' });

  Set.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Set.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Set.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });
  Set.hasMany(Module, { foreignKey: 'setId', as: 'modules' });
  Set.hasMany(Assessment, { foreignKey: 'setId', as: 'assessments' });
  Set.hasMany(Question, { foreignKey: 'setId', as: 'questions' });
  Set.hasMany(AssessmentResult, { foreignKey: 'setId', as: 'assessmentResults' });

  Module.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Module.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Module.hasMany(Unit, { foreignKey: 'moduleId', as: 'units' });
  Module.hasMany(Assessment, { foreignKey: 'moduleId', as: 'assessments' });
  Module.hasMany(Question, { foreignKey: 'moduleId', as: 'questions' });
  Module.hasMany(AssessmentResult, { foreignKey: 'moduleId', as: 'assessmentResults' });

  Unit.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Unit.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  Unit.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Unit.hasMany(Assessment, { foreignKey: 'unitId', as: 'assessments' });
  Unit.hasMany(Question, { foreignKey: 'unitId', as: 'questions' });
  Unit.hasMany(AssessmentResult, { foreignKey: 'unitId', as: 'assessmentResults' });

  LearningPath.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  LearningPath.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  LearningPath.belongsTo(Module, { foreignKey: 'currentModuleId', as: 'currentModuleRelation' });
  LearningPath.belongsTo(Unit, { foreignKey: 'currentUnitId', as: 'currentUnitRelation' });

  Assessment.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Assessment.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  Assessment.belongsTo(Unit, { foreignKey: 'unitId', as: 'unitRelation' });
  Assessment.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Assessment.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Assessment.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });
  Assessment.hasMany(Question, { foreignKey: 'assessmentId', as: 'questions' });

  Question.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Question.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  Question.belongsTo(Unit, { foreignKey: 'unitId', as: 'unitRelation' });
  Question.belongsTo(Assessment, { foreignKey: 'assessmentId', as: 'assessment' });
  Question.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Question.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Question.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });

  AssessmentResult.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  AssessmentResult.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  AssessmentResult.belongsTo(Unit, { foreignKey: 'unitId', as: 'unitRelation' });
  AssessmentResult.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  AssessmentResult.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  AssessmentResult.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });
  AssessmentResult.belongsTo(LearningPath, { foreignKey: 'learningPathId', as: 'learningPath' });
}
