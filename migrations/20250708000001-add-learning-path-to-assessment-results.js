'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Add as nullable
    await queryInterface.addColumn('assessment_results', 'learning_path_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Step 1: allow nulls initially
      references: {
        model: 'learning_paths',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'learning_path_id'
    });

    // 2. Optionally backfill here if you have a default or can infer the value
    // Example: await queryInterface.sequelize.query('UPDATE assessment_results SET learning_path_id = 1 WHERE learning_path_id IS NULL');

    // 3. Set NOT NULL constraint (if all rows are filled)
    // SQLite does not support ALTER COLUMN directly, so you may need to recreate the table for strict NOT NULL.
    // For most dev cases, you can leave as nullable, or document that new rows must provide learning_path_id.
    // If you want to enforce NOT NULL, see Sequelize docs for table recreation workaround.
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assessment_results', 'learning_path_id');
  }
};
