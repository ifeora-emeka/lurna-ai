import { Set } from './Set';
import { Module } from './Module';
import { Unit } from './Unit';
import { LearningPath } from './LearningPath';
import { Assessment } from './Assessment';
import { Question } from './Question';
import { AssessmentResult } from './AssessmentResult';
import User from './User';

export function initializeAssociations() {
  Set.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
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

  Question.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Question.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  Question.belongsTo(Unit, { foreignKey: 'unitId', as: 'unitRelation' });
  Question.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });

  AssessmentResult.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  AssessmentResult.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  AssessmentResult.belongsTo(Unit, { foreignKey: 'unitId', as: 'unitRelation' });
  AssessmentResult.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
}
