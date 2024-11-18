'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('swiped_foods', {
      swipe_id: {
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
      food_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'foods',
          key: 'food_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      swipe_direction: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('swiped_foods');
  }
};