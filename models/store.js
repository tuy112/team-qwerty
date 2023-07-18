'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.hasMany(models.orders, {
        sourceKey: 'store_id',
        foreignKey: 'store_id',
      });
      this.hasMany(models.reviews, {
        sourceKey: 'store_id',
        foreignKey: 'store_id',
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
    }
  );
  return Store;
};