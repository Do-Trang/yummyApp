'use strict';
const { 
  Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      ReviewFood.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      ReviewFood.belongsTo(models.Food, {
        foreignKey: 'food_id',
        as: 'food'
      });
    }
  }

  ReviewFood.init({
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
    },
  }, {
    sequelize,
    modelName: 'ReviewFood',
    tableName: 'review_foods',
    timestamps: false
  });

  return ReviewFood;
};
