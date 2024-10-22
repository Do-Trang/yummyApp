'use strict';
const { 
  Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewRestaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      ReviewRestaurant.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      ReviewRestaurant.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
        as: 'restaurant'
      });
    }
  }

  ReviewRestaurant.init({
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
    restaurant_id: {
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
    modelName: 'ReviewRestaurant',
    tableName: 'review_restaurants',
    timestamps: false
  });

  return ReviewRestaurant;
};
