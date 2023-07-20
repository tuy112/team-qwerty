'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // user모델 - order모델 : 1:N 관계
            this.hasMany(models.Users, {
                sourceKey: 'userId',
                foreignKey: 'userId',
            });

            // user모델 - review모델 : 1:N 관계
            this.hasMany(models.OrderMenus, {
                sourceKey: 'userId',
                foreignKey: 'userId',
            });
        }
    }

    Users.init(
        {
            userId: {
                allowNull: false, // NOT NULL
                autoIncrement: true, // AUTO_INCREMENT
                primaryKey: true, // Primary Key (기본키)
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false, // NOT NULL
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false, // NOT NULL
                type: DataTypes.STRING,
            },
            point: {
                allowNull: true, // NULL
                type: DataTypes.STRING,
                defaultValue: 1000000,
            },
            createdAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Users',
        },
    );
    return Users;
};
