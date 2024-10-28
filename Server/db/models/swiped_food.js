'use strict';
const { 
  Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SwipedFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SwipedFood.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      SwipedFood.belongsTo(models.Food, {
        foreignKey: 'food_id',
        as: 'food'
      });
    }
  }

  SwipedFood.init({
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
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    swipe_direction: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SwipedFood',
    tableName: 'swiped_foods',
    timestamps: false
  });

  return SwipedFood;
};
