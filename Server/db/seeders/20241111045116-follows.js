'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('follows', [
      {
        id: 1,
        follower_id: 1,
        followed_id: 2,
        created_at: new Date('2024-11-11 01:32:19.419172+07'),
      },
      
      {
        id: 2,
        follower_id: 2,
        followed_id: 1,
        created_at: new Date('2024-11-11 01:32:19.419172+07'),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('follows', null, {});
  }
};
