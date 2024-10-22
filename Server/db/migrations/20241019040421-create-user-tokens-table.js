'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_tokens', {
      user_id: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      otp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      otp_expiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      token_expiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      check_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_tokens');
  }
};
