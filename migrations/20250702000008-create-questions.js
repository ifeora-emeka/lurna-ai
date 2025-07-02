'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      options: {
        type: Sequelize.JSON,
        allowNull: false
      },
      correctAnswer: {
        type: Sequelize.JSON,
        allowNull: false,
        field: 'correct_answer'
      },
      explanation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      points: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 1.0
      },
      difficultyLevel: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'difficulty_level'
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('questions');
  }
};
