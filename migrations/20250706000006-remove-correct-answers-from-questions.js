'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First create a backup of the questions table
    await queryInterface.sequelize.query('CREATE TABLE questions_backup AS SELECT * FROM questions');
    
    // Drop the existing questions table
    await queryInterface.dropTable('questions');
    
    // Recreate the questions table without the correct_answers column and isCorrect in options
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'modules',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'units',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      assessment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'assessments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      explanation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hint: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sub_categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    
    // Copy the data back, excluding the correct_answers column
    // and modifying the options to remove isCorrect
    await queryInterface.sequelize.query(`
      INSERT INTO questions (
        id, created_by, set_id, module_id, unit_id, assessment_id, 
        content, type, environment, options, explanation, hint,
        category_id, sub_category_id, created_at, updated_at
      )
      SELECT 
        id, created_by, set_id, module_id, unit_id, assessment_id, 
        content, type, environment, 
        (SELECT json_group_array(json_object(
          'id', json_extract(value, '$.id'),
          'content', json_extract(value, '$.content')
        ))
        FROM json_each(options)) as options,
        explanation, hint,
        category_id, sub_category_id, created_at, updated_at
      FROM questions_backup
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // If we need to rollback, restore the table from backup
    await queryInterface.dropTable('questions');
    await queryInterface.sequelize.query('CREATE TABLE questions AS SELECT * FROM questions_backup');
    await queryInterface.sequelize.query('DROP TABLE questions_backup');
  }
};
