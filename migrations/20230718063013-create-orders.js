'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            orderId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                reference: {
                    models: 'OrderMenus',
                    key: 'orderId',
                },
                onDelete: 'CASCADE',
            },
            storeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                reference: {
                    models: 'Stores',
                    key: 'storeId',
                },
                onDelete: 'CASCADE',
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                reference: {
                    models: 'Users',
                    key: 'userId',
                },
                onDelete: 'CASCADE',
            },
            totalPrice: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            delivery: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                default: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    },
};
