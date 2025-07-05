'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if categories table exists
    try {
      // Add iconClass to categories table if it doesn't exist
      await queryInterface.addColumn('categories', 'icon_class', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'fa-solid fa-book'
      });
      console.log('Added icon_class column to categories table');
    } catch (error) {
      console.log('Error adding icon_class to categories table:', error.message);
      // Continue even if this fails (column might already exist)
    }

    // Check if assessment_results table exists and add category_id and sub_category_id if needed
    try {
      await queryInterface.addColumn('assessment_results', 'category_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        }
      });
      console.log('Added category_id column to assessment_results table');
    } catch (error) {
      console.log('Error adding category_id to assessment_results table:', error.message);
      // Continue even if this fails
    }

    try {
      await queryInterface.addColumn('assessment_results', 'sub_category_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sub_categories',
          key: 'id'
        }
      });
      console.log('Added sub_category_id column to assessment_results table');
    } catch (error) {
      console.log('Error adding sub_category_id to assessment_results table:', error.message);
      // Continue even if this fails
    }

    // Check if sets table exists and add category_id and sub_category_id if needed
    try {
      await queryInterface.addColumn('sets', 'category_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        }
      });
      console.log('Added category_id column to sets table');
    } catch (error) {
      console.log('Error adding category_id to sets table:', error.message);
      // Continue even if this fails
    }

    try {
      await queryInterface.addColumn('sets', 'sub_category_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sub_categories',
          key: 'id'
        }
      });
      console.log('Added sub_category_id column to sets table');
    } catch (error) {
      console.log('Error adding sub_category_id to sets table:', error.message);
      // Continue even if this fails
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns in reverse order
    try {
      await queryInterface.removeColumn('sets', 'sub_category_id');
    } catch (error) {
      console.log('Error removing sub_category_id from sets table:', error.message);
    }

    try {
      await queryInterface.removeColumn('sets', 'category_id');
    } catch (error) {
      console.log('Error removing category_id from sets table:', error.message);
    }

    try {
      await queryInterface.removeColumn('assessment_results', 'sub_category_id');
    } catch (error) {
      console.log('Error removing sub_category_id from assessment_results table:', error.message);
    }

    try {
      await queryInterface.removeColumn('assessment_results', 'category_id');
    } catch (error) {
      console.log('Error removing category_id from assessment_results table:', error.message);
    }

    try {
      await queryInterface.removeColumn('categories', 'icon_class');
    } catch (error) {
      console.log('Error removing icon_class from categories table:', error.message);
    }
  }
};
