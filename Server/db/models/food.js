'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
        as: 'restaurant',
      });
    }
  }

  Food.init({
    food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'restaurant_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rating: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'foods',
    timestamps: false,
  });

  return Food;
};
