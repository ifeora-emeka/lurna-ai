'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // SQLite doesn't support adding a foreign key with a default value
    // We need to create a new table with the correct schema and migrate data
    
    // 1. Rename the current table to a backup
    await queryInterface.renameTable('assessment_results', 'assessment_results_backup');
    
    // 2. Create the new table with all columns including the new one
    await queryInterface.createTable('assessment_results', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false
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
      result: {
        type: Sequelize.JSON,
        allowNull: false
      },
      advice: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      difficulty_level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sub_categories',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    
    // 3. Copy data from backup table to new table with default assessment_id value of 1
    await queryInterface.sequelize.query(`
      INSERT INTO assessment_results (
        id, created_by, set_id, module_id, unit_id, result, advice, 
        difficulty_level, is_completed, category_id, sub_category_id, 
        created_at, updated_at, assessment_id
      )
      SELECT 
        id, created_by, set_id, module_id, unit_id, result, advice, 
        difficulty_level, is_completed, category_id, sub_category_id, 
        created_at, updated_at, 1
      FROM assessment_results_backup
    `);
    
    // 4. Drop the backup table
    await queryInterface.dropTable('assessment_results_backup');
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Rename the current table to a backup
    await queryInterface.renameTable('assessment_results', 'assessment_results_backup');
    
    // 2. Create the original table without assessment_id
    await queryInterface.createTable('assessment_results', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false
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
      result: {
        type: Sequelize.JSON,
        allowNull: false
      },
      advice: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      difficulty_level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sub_categories',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    
    // 3. Copy data back excluding assessment_id
    await queryInterface.sequelize.query(`
      INSERT INTO assessment_results (
        id, created_by, set_id, module_id, unit_id, result, advice, 
        difficulty_level, is_completed, category_id, sub_category_id, 
        created_at, updated_at
      )
      SELECT 
        id, created_by, set_id, module_id, unit_id, result, advice, 
        difficulty_level, is_completed, category_id, sub_category_id, 
        created_at, updated_at
      FROM assessment_results_backup
    `);
    
    // 4. Drop the backup table
    await queryInterface.dropTable('assessment_results_backup');
  }
};
