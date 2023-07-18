'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Store, {
        foreignKey: 'storeId',
      });
      Menu.belongsToMany(models.Order, {
        through: 'OrderMenu',
        foreignKey: 'menuId',
        otherKey: 'orderId',
      });
    }
  }

  Menu.init(
    {
      menuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      storeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      menuName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      price: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Menu',
    }
  );

  return Menu;
};
