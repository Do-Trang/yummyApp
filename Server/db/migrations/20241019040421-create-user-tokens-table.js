'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_tokens', {
      id: {
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
      device_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    // Xóa bảng user_tokens
    await queryInterface.dropTable('user_tokens');
  }
};
