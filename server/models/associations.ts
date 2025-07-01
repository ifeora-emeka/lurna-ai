import { Set } from './Set';
import { Module } from './Module';
import { Unit } from './Unit';
import User from './User';

// Set up associations
export function initializeAssociations() {
  // Set associations
  Set.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Set.hasMany(Module, { foreignKey: 'set', as: 'modules' });

  // Module associations
  Module.belongsTo(Set, { foreignKey: 'set', as: 'setRelation' });
  Module.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
  Module.hasMany(Unit, { foreignKey: 'module', as: 'units' });

  // Unit associations
  Unit.belongsTo(Set, { foreignKey: 'set', as: 'setRelation' });
  Unit.belongsTo(Module, { foreignKey: 'module', as: 'moduleRelation' });
  Unit.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
}
