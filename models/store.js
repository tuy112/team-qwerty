'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate(models) {
        this.hasMany(models.orders, {
          sourceKey: 'storeId',
          foreignKey: 'storeId',
        });
        this.hasMany(models.reviews, {
          sourceKey: 'storeId',
          foreignKey: 'storeId',
        });
    }
  }
  Store.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      storeName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      storeImage: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      totalRating: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Store',
    },
  );
  return Store;
};
