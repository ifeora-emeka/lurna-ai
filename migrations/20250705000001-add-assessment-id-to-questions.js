'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('questions', 'assessment_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'assessments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      defaultValue: 1 // This is temporary to allow migration on existing data
    });

    // Remove the defaultValue constraint after the column is added
    await queryInterface.changeColumn('questions', 'assessment_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'assessments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'assessment_id');
  }
};
