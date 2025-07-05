'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add category_id to sets table
    await queryInterface.addColumn('sets', 'category_id', {
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

    // Add sub_category_id to sets table
    await queryInterface.addColumn('sets', 'sub_category_id', {
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
    await queryInterface.changeColumn('sets', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('sets', 'sub_category_id', {
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
    await queryInterface.removeColumn('sets', 'category_id');
    await queryInterface.removeColumn('sets', 'sub_category_id');
  }
};
