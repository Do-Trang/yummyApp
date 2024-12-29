'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here. 123456789Tp@
    */
    await queryInterface.bulkInsert('users', [
      {
        username: 'An2004',
        password: '$2a$10$VprxuC.4w9lANN4RxaLH5ecZzJ7j2a0u/zYqrPjAG31feB5UILoYi',
        email: 'quocan2004tp@gmail.com',
        phone_number: null,
        dob: '1990-01-01',
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/avatars%2Frn_image_picker_lib_temp_a10583c2-7a69-49eb-a83b-dc659603f70d.jpg?alt=media&token=08303e9d-93c9-4a13-a08f-4327c6155971',
        gender: true,
        last_login: '2024-11-10 08:30:00+07',
        address: 'Tân Phong, Vũ Thư, Thái Bình',
        is_active: false,
        description: 'Một người yêu thích ẩm thực và khám phá món ăn mới',
      },
      
      {
        username: 'AnNgo123',
        password: '$2a$10$VprxuC.4w9lANN4RxaLH5ecZzJ7j2a0u/zYqrPjAG31feB5UILoYi',
        email: null,
        phone_number: '0985834023',
        dob: '1992-05-15',
        avatar_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/avatars%2Frn_image_picker_lib_temp_0413c7ee-c8d4-4937-b2e6-551829a4b885.jpg?alt=media&token=d2e76db7-2c56-48b0-bc38-7d5a5e5a8c5a',
        gender: false,
        last_login: '2024-11-10 09:45:00+07',
        address: '58 Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội',
        is_active: false,
        description: 'Đam mê du lịch và thưởng thức các món ăn đặc sản',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
