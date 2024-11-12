'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('swiped_foods', [
      {
        swipe_id: 1,
        user_id: 1,
        food_id: 2,
        swipe_direction: 'right',
      },

      {
        swipe_id: 2,
        user_id: 2,
        food_id: 2,
        swipe_direction: 'left',
      },

      {
        swipe_id: 3,
        user_id: 1,
        food_id: 1,
        swipe_direction: 'left',
      },

      {
        swipe_id: 4,
        user_id: 2,
        food_id: 1,
        swipe_direction: 'right',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('swiped_foods', null, {});
  }
};
