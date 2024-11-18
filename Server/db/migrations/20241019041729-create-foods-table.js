'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foods', {
      food_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'restaurant_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      rating: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING(255)),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('foods');
  }
};
