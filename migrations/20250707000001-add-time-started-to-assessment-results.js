'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('assessment_results', 'time_started', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'is_completed'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assessment_results', 'time_started');
  }
};
