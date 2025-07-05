'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add category_id to questions table
    await queryInterface.addColumn('questions', 'category_id', {
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

    // Add sub_category_id to questions table
    await queryInterface.addColumn('questions', 'sub_category_id', {
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

    // Remove the defaultValue constraints
    await queryInterface.changeColumn('questions', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('questions', 'sub_category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sub_categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'category_id');
    await queryInterface.removeColumn('questions', 'sub_category_id');
  }
};
