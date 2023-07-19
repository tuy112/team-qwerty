'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderMenus', {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        reference: {
          models: 'Orders',
          key: 'orderId',
        },
        onDelete: 'CASCADE',
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          models: 'Menus',
          key: 'menuId',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderMenus');
  },
};
