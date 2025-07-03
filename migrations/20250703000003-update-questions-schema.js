'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing questions table
    await queryInterface.dropTable('questions');
    
    // Create the questions table with the correct schema
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'created_by',
      },
      setId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'set_id',
      },
      moduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'module_id',
      },
      unitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'unit_id',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      environment: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default',
      },
      options: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      correctAnswers: {
        type: Sequelize.JSON,
        allowNull: false,
        field: 'correct_answers',
      },
      explanation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hint: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Restore the original questions table schema
    await queryInterface.dropTable('questions');
    
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
  }
};
