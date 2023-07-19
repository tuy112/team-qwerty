'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Stores와 Menus는 일대다 관계
      this.belongsTo(models.Stores, {
        targetKey: 'storeId',
        foreignKey: 'StoreId',
    });
    }
  }
  Menus.init({
    menuId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
  },
  StoreId: {
      allowNull: false,
      type: DataTypes.INTEGER,
  },
  menuName: {
      allowNull: false,
      type: DataTypes.STRING,
  },
  menuImage: {
      type: DataTypes.STRING,
  },
  price: {
      allowNull: false,
      type: DataTypes.INTEGER,
  },
  }, {
    sequelize,
    modelName: 'Menus',
  });
  return Menus;
};