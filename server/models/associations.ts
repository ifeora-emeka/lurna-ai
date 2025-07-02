import { Set } from './Set';
import { Module } from './Module';
import { Unit } from './Unit';
import { LearningPath } from './LearningPath';
import { Assessment } from './Assessment';
import User from './User';

export function initializeAssociations() {
  Set.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Set.hasMany(Module, { foreignKey: 'set', as: 'modules' });
  Set.hasMany(LearningPath, { foreignKey: 'setId', as: 'learningPaths' });
  Set.hasMany(Assessment, { foreignKey: 'setId', as: 'assessments' });

  Module.belongsTo(Set, { foreignKey: 'set', as: 'setRelation' });
  Module.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Module.hasMany(Unit, { foreignKey: 'moduleId', as: 'units' });
  Module.hasMany(Assessment, { foreignKey: 'moduleId', as: 'assessments' });

  Unit.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Unit.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  Unit.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Unit.hasMany(Assessment, { foreignKey: 'unitId', as: 'assessments' });

  LearningPath.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  LearningPath.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  LearningPath.belongsTo(Module, { foreignKey: 'currentModuleId', as: 'currentModuleRelation' });
  LearningPath.belongsTo(Unit, { foreignKey: 'currentUnitId', as: 'currentUnitRelation' });

  Assessment.belongsTo(Set, { foreignKey: 'setId', as: 'setRelation' });
  Assessment.belongsTo(Module, { foreignKey: 'moduleId', as: 'moduleRelation' });
  Assessment.belongsTo(Unit, { foreignKey: 'unitId', as: 'unitRelation' });
  Assessment.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
}
