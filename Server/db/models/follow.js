'use strict';
const { 
    Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Follow.belongsTo(models.User, {
        foreignKey: 'follower_id',
        as: 'follower'
      });
      Follow.belongsTo(models.User, {
        foreignKey: 'followed_id',
        as: 'followed'
      });
    }
  }

  Follow.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onDelete: 'CASCADE'
    },
    followed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onDelete: 'CASCADE'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
  }, {
    sequelize,
    modelName: 'Follow',
    tableName: 'follows',
    timestamps: false,
  });

  return Follow;
};