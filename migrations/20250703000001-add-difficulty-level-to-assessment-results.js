'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('assessment_results', 'difficulty_level', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'medium'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assessment_results', 'difficulty_level');
  }
};
