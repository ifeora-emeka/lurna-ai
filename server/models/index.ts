// Import all models
import { User } from './User';
import { Set } from './Set';
import { Module } from './Module';
import { Unit } from './Unit';
import { initializeAssociations } from './associations';

// Initialize associations
// This should be called after all models are imported but before they're used
export { initializeAssociations };

// Export all models
export {
  User,
  Set,
  Module,
  Unit
};
