'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if columns already exist
    const tableInfo = await queryInterface.describeTable('assessment_results');
    
    // Add category_id to assessment_results table if it doesn't exist
    if (!tableInfo.category_id) {
      await queryInterface.addColumn('assessment_results', 'category_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: 1 // Temporary default value for migration
      });
    } else {
      console.log('Column category_id already exists in assessment_results table');
    }

    // Add sub_category_id to assessment_results table if it doesn't exist
    if (!tableInfo.sub_category_id) {
      await queryInterface.addColumn('assessment_results', 'sub_category_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sub_categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: 1 // Temporary default value for migration
      });
    } else {
      console.log('Column sub_category_id already exists in assessment_results table');
    }

    // Remove the defaultValue constraints if the columns were added
    try {
      const tableInfo = await queryInterface.describeTable('assessment_results');
      
      if (tableInfo.category_id) {
        await queryInterface.changeColumn('assessment_results', 'category_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        });
      }

      if (tableInfo.sub_category_id) {
        await queryInterface.changeColumn('assessment_results', 'sub_category_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'sub_categories',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        });
      }
    } catch (error) {
      console.log('Warning: Could not update column constraints:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Check if columns exist before trying to remove them
      const tableInfo = await queryInterface.describeTable('assessment_results');
      
      if (tableInfo.category_id) {
        await queryInterface.removeColumn('assessment_results', 'category_id');
      }
      
      if (tableInfo.sub_category_id) {
        await queryInterface.removeColumn('assessment_results', 'sub_category_id');
      }
    } catch (error) {
      console.log('Error in down migration:', error.message);
    }
  }
};
