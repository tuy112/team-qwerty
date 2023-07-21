'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reviews extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // review모델 - order모델 : N:1 관계
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'userId',
            });

            // review모델 -store모델 : N:1 관계
            this.belongsTo(models.Stores, {
                targetKey: 'storeId',
                foreignKey: 'storeId',
            });
        }
    }

    Reviews.init(
        {
            reviewId: {
                allowNull: false, // NOT NULL
                autoIncrement: true, // AUTO_INCREMENT
                primaryKey: true, // Primary Key (기본키)
                type: DataTypes.INTEGER,
            },
            storeId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            image: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            rating: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Reviews',
        },
    );
    return Reviews;
};
