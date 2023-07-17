'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.orderMenus, {
        sourceKey: 'menuId',
        foreignKey: 'menuId',
      });
    }
  }
  Menu.init(
    {
    storeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    },
  );
  return Menu;
};
