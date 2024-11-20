'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('swiped_restaurants', [
      {
        swipe_id: 1,
        user_id: 1,
        restaurant_id: 3,
        swipe_direction: 'right',
      },

      {
        swipe_id: 2,
        user_id: 1,
        restaurant_id: 5,
        swipe_direction: 'left',
      },

      {
        swipe_id: 3,
        user_id: 2,
        restaurant_id: 1,
        swipe_direction: 'left',
      },

      {
        swipe_id: 4,
        user_id: 2,
        restaurant_id: 7,
        swipe_direction: 'right',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('swiped_restaurants', null, {});
  }
};
