'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DBStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DBStore.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    storeName: DataTypes.STRING,
    storeImage: DataTypes.STRING,
    totalRating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DBStore',
  });
  return DBStore;
};