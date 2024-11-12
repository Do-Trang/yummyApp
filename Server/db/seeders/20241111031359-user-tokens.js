'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    await queryInterface.bulkInsert('user_tokens', [
      {
        user_id: 1,
        refresh_token: null,
        otp: null,
        otp_expiration: null,
        token_expiration: null,
        check_verified: true,
      },
      
      {
        user_id: 2,
        refresh_token: null,
        otp: null,
        otp_expiration: null,
        token_expiration: null,
        check_verified: true,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('user_tokens', null, {});
  }
};
