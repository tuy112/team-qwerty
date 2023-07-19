'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderMenus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // OrderMenu모델 - order모델 : N:1 관계
      this.belongsTo(models.Orders, {
      targetKey: 'orderId',
      foreignKey: 'orderId',        
      });
      
      // OrderMenu모델 - menu모델 : N:1 관계
      this.belongsTo(models.Menus, {
      targetKey: 'menuId',
      foreignKey: 'menuId',        
      });
    }
  }

  OrderMenus.init({
    orderId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,      
    },
    menuId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,      
    },
    quantity: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,      
    }
  }, {
    sequelize,
    modelName: 'OrderMenus',
  });
  return OrderMenus;
};