'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // SQLite doesn't support adding constraints after table creation like other databases
    // The constraint will be enforced at the application level in the Sequelize model
    // which is already done in server/models/Question.ts
    console.log('Question type constraint is enforced at the application level in the Sequelize model');
  },

  down: async (queryInterface, Sequelize) => {
    // No database-level constraint to remove
    console.log('No database-level constraint to remove');
  }
};
