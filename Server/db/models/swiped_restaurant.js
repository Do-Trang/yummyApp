'use strict';
const { 
  Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SwipedRestaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SwipedRestaurant.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      SwipedRestaurant.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
        as: 'restaurant'
      });
    }
  }

  SwipedRestaurant.init({
    swipe_id: {
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
    swipe_direction: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SwipedRestaurant',
    tableName: 'swiped_restaurants',
    timestamps: false
  });

  return SwipedRestaurant;
};
