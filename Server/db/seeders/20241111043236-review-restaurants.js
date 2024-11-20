'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('review_restaurants', [
      {
        review_id: 1,
        user_id: 1,
        restaurant_id: 1,
        rating: JSON.stringify({
          "restaurant_rating_service": 4.0,
          "restaurant_rating_price": 4.0,
          "restaurant_rating_food": 4.0,
          "restaurant_rating_decoration": 4.0
        }),
        comment: 'Chất lượng món ăn trung bình, chưa thực sự ấn tượng.',
        created_at: '2024-11-11 08:41:53.971552+07'
      },

      {
        review_id: 2,
        user_id: 2,
        restaurant_id: 2,
        rating: JSON.stringify({
          "restaurant_rating_service": 9.0,
          "restaurant_rating_price": 9.5,
          "restaurant_rating_food": 9.0,
          "restaurant_rating_decoration": 9.0
        }),
        comment: 'Chất lượng món ăn tuyệt vời, trình bày đẹp mắt và giá cả hợp lý.',
        created_at: '2024-11-11 08:41:53.971552+07'
      },

      {
        review_id: 3,
        user_id: 1,
        restaurant_id: 4,
        rating: JSON.stringify({
          "restaurant_rating_service": 8.0,
          "restaurant_rating_price": 8.0,
          "restaurant_rating_food": 8.0,
          "restaurant_rating_decoration": 8.0
        }),
        comment: 'Hương vị mì đậm đà, trang trí món ăn bắt mắt nhưng giá hơi cao.',
        created_at: '2024-11-11 08:44:56.486435+07'
      },

      {
        review_id: 4,
        user_id: 2,
        restaurant_id: 4,
        rating: JSON.stringify({
          "restaurant_rating_service": 10.0,
          "restaurant_rating_price": 10.0,
          "restaurant_rating_food": 10.0,
          "restaurant_rating_decoration": 10.0
        }),
        comment: 'Món ăn ngon và tươi, không gian quán ấm cúng, rất đáng để thử.',
        created_at: '2024-11-11 08:44:56.486435+07'
      },

      {
        review_id: 5,
        user_id: 1,
        restaurant_id: 3,
        rating: JSON.stringify({
          "restaurant_rating_service": 8.0,
          "restaurant_rating_price": 8.0,
          "restaurant_rating_food": 8.0,
          "restaurant_rating_decoration": 8.0
        }),
        comment: 'Món ăn có hương vị đậm đà, cách trình bày tinh tế, nhưng giá cả vẫn hơi cao.',
        created_at: '2024-11-11 08:47:19.605058+07'
      },

      {
        review_id: 6,
        user_id: 2,
        restaurant_id: 5,
        rating: JSON.stringify({
          "restaurant_rating_service": 8.5,
          "restaurant_rating_price": 7.0,
          "restaurant_rating_food": 9.0,
          "restaurant_rating_decoration": 6.8
        }),
        comment: 'Hương vị phở khá đậm đà và truyền thống, tuy nhiên phần trình bày có thể cải thiện thêm. Giá hợp lý so với chất lượng.',
        created_at: '2024-11-11 08:49:20.122467+07'
      },

      {
        review_id: 7,
        user_id: 2,
        restaurant_id: 6,
        rating: JSON.stringify({
          "restaurant_rating_service": 7.5,
          "restaurant_rating_price": 7.0,
          "restaurant_rating_food": 7.0,
          "restaurant_rating_decoration": 6.0
        }),
        comment: 'Món nướng khá ngon và nước chấm đậm đà, tuy nhiên có thể cải thiện độ tươi của món. Không gian quán rộng rãi, tạo cảm giác thoải mái.',
        created_at: '2024-11-11 08:51:21.501827+07'
      },

      {
        review_id: 8,
        user_id: 1,
        restaurant_id: 7,
        rating: JSON.stringify({
          "restaurant_rating_service": 8.0,
          "restaurant_rating_price": 9.5,
          "restaurant_rating_food": 7.0,
          "restaurant_rating_decoration": 8.0
        }),
        comment: 'Chè sầu ngon, topping phong phú và tươi, vị ngọt vừa phải. Không gian quán thoải mái và giá cả hợp lý.',
        created_at: '2024-11-11 08:53:23.392981+07'
      },

      {
        review_id: 9,
        user_id: 2,
        restaurant_id: 7,
        rating: JSON.stringify({
          "restaurant_rating_service": 6.0,
          "restaurant_rating_price": 8.5,
          "restaurant_rating_food": 7.0,
          "restaurant_rating_decoration": 4.0
        }),
        comment: 'Chè sầu có vị đặc trưng, nhưng độ tươi của nguyên liệu chưa đạt yêu cầu. Dù vậy, món ăn vẫn hấp dẫn và dễ chịu.',
        created_at: '2024-11-11 08:53:23.392981+07'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('review_restaurants', null, {});
  }
};
