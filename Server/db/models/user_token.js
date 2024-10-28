'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserToken.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  UserToken.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    otp_expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    token_expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'UserToken',
    tableName: 'user_tokens',
    timestamps: false,
  });

  return UserToken;
};
