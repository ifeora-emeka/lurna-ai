'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assessment_results', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      assessmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'assessment_id',
        references: {
          model: 'assessments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      maxScore: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'max_score'
      },
      passThreshold: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'pass_threshold'
      },
      isPassed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_passed'
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'started_at'
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'completed_at'
      },
      answers: {
        type: Sequelize.JSON,
        allowNull: false
      },
      timeSpent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'time_spent'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assessment_results');
  }
};
