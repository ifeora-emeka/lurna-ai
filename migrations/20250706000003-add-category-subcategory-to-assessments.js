'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add category_id to assessments table
    await queryInterface.addColumn('assessments', 'category_id', {
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

    // Add sub_category_id to assessments table
    await queryInterface.addColumn('assessments', 'sub_category_id', {
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
    await queryInterface.changeColumn('assessments', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('assessments', 'sub_category_id', {
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
    await queryInterface.removeColumn('assessments', 'category_id');
    await queryInterface.removeColumn('assessments', 'sub_category_id');
  }
};
