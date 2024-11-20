'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('review_foods', [
      {
        review_id: 1,
        user_id: 2,
        food_id: 1,
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 8.2,
          "food_rating_price": 8.0,
          "food_rating_fresh": 9.5,
        }),
        comment: "Phở bò tái rất ngon, nước dùng đậm đà, thịt bò tươi và mềm. Bánh phở mịn màng, nước dùng thanh không quá ngấy, rất thích hợp cho những ai yêu thích hương vị truyền thống.",
        created_at: "2024-11-11 08:58:10.184864+07"
      },

      {
        review_id: 2,
        user_id: 2,
        food_id: 2,
        rating: JSON.stringify({
          "food_rating_delicious": 9.0,
          "food_rating_presentation": 8.0,
          "food_rating_price": 9.0,
          "food_rating_fresh": 9.5,
        }),
        comment: "Phở gà rất ngon, thịt gà tươi và mềm, nước dùng ngọt thanh, rất phù hợp cho bữa sáng. Tuy nhiên, tôi mong muốn có thêm nhiều gia vị để tăng phần đậm đà.",
        created_at: "2024-11-11 08:58:10.184864+07"
      },

      {
        review_id: 3,
        user_id: 1,
        food_id: 3,
        rating: JSON.stringify({
          "food_rating_delicious": 9.6,
          "food_rating_presentation": 9.5,
          "food_rating_price": 9.5,
          "food_rating_fresh": 9.5,
        }),
        comment: "Bún bò Huế ngon tuyệt, nước dùng đậm đà, hương vị cay đặc trưng, thịt bò mềm, giá cả hợp lý.",
        created_at: "2024-11-11 09:00:38.390891+07"
      },

      {
        review_id: 4,
        user_id: 2,
        food_id: 3,
        rating: JSON.stringify({
          "food_rating_delicious": 10.0,
          "food_rating_presentation": 8.5,
          "food_rating_price": 8.5,
          "food_rating_fresh": 9.5,
        }),
        comment: "Bún bò Huế ngon, thịt bò tươi, nước dùng đậm đà, chỉ có phần trình bày chưa bắt mắt bằng những nơi khác.",
        created_at: "2024-11-11 09:00:38.390891+07"
      },

      {
        review_id: 5,
        user_id: 1,
        food_id: 4,
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 9.0,
          "food_rating_price": 9.0,
          "food_rating_fresh": 9.5,
        }),
        comment: "Món ramen rất ngon, nước dùng đậm đà, mì mềm, thịt tươi và thái mỏng vừa phải. Món ăn được trình bày đẹp mắt.",
        created_at: "2024-11-11 09:02:14.150413+07"
      },

      {
        review_id: 6,
        user_id: 1,
        food_id: 5,
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 8.2,
          "food_rating_price": 8.0,
          "food_rating_fresh": 9.5,
        }),
        comment: "Tempura giòn tan, tươi ngon, nước chấm rất hợp với món ăn. Tuy nhiên, giá hơi cao so với khẩu phần ăn.",
        created_at: "2024-11-11 09:03:28.493996+07"
      },

      {
        review_id: 7,
        user_id: 1,
        food_id: 6,
        rating: JSON.stringify({
          "food_rating_delicious": 9.0,
          "food_rating_presentation": 8.5,
          "food_rating_price": 9.0,
          "food_rating_fresh": 9.5,
        }),
        comment: "Sushi rất tươi ngon, cá có vị thanh ngọt tự nhiên, cơm sushi dẻo và vừa miệng. Trình bày món ăn đẹp mắt, tuy nhiên giá hơi cao.",
        created_at: "2024-11-11 09:07:46.253974+07"
      },

      {
        review_id: 8,
        user_id: 1,
        food_id: 7,
        rating: JSON.stringify({
          "food_rating_delicious": 9.9,
          "food_rating_presentation": 9.0,
          "food_rating_price": 9.5,
          "food_rating_fresh": 9.5,
        }),
        comment: "Wagyu rất mềm và thơm, thịt tươi ngon với hương vị đậm đà. Món ăn được trình bày tinh tế, giá cả hợp lý so với chất lượng.",
        created_at: "2024-11-11 09:07:46.253974+07"
      },

      {
        review_id: 9,
        user_id: 2,
        food_id: 8,
        rating: JSON.stringify({
          "food_rating_delicious": 9.7,
          "food_rating_presentation": 9.2,
          "food_rating_price": 7.0,
          "food_rating_fresh": 9.5,
        }),
        comment: "Sườn nướng rất ngon, thịt mềm, có hương vị đậm đà. Nước sốt rất vừa miệng, tuy nhiên giá hơi cao so với chất lượng.",
        created_at: "2024-11-11 09:07:46.253974+07"
      },

      {
        review_id: 10,
        user_id: 1,
        food_id: 9,
        rating: JSON.stringify({
          "food_rating_delicious": 10.0,
          "food_rating_presentation": 8.5,
          "food_rating_price": 7.5,
          "food_rating_fresh": 9.0,
        }),
        comment: "Tào phớ trân châu rất mát, vị ngọt vừa phải và trân châu dẻo ngon. Món ăn rất thích hợp cho mùa hè, giá cả hợp lý.",
        created_at: "2024-11-11 09:12:23.610225+07"
      },

      {
        review_id: 11,
        user_id: 2,
        food_id: 9,
        rating: JSON.stringify({
          "food_rating_delicious": 9.0,
          "food_rating_presentation": 8.5,
          "food_rating_price": 8.5,
          "food_rating_fresh": 9.0,
        }),
        comment: "Món tào phớ rất ngon, trân châu mềm, thơm và tươi. Cảm giác mát lạnh, vị ngọt thanh, món ăn rất đáng thử.",
        created_at: "2024-11-11 09:12:23.610225+07"
      },

      {
        review_id: 12,
        user_id: 1,
        food_id: 10,
        rating: JSON.stringify({
          "food_rating_delicious": 9.0,
          "food_rating_presentation": 8.6,
          "food_rating_price": 8.0,
          "food_rating_fresh": 9.0,
        }),
        comment: "Chè Thái rất ngon, hương vị thanh mát, ngọt vừa phải. Toppings đầy đủ và tươi ngon, giá cả hợp lý.",
        created_at: "2024-11-11 09:12:23.610225+07"
      },

      {
        review_id: 13,
        user_id: 2,
        food_id: 10,
        rating: JSON.stringify({
          "food_rating_delicious": 9.4,
          "food_rating_presentation": 9.0,
          "food_rating_price": 7.0,
          "food_rating_fresh": 10.0,
        }),
        comment: "Chè Thái có hương vị thơm ngon, ngọt dịu nhẹ, topping phong phú. Tuy nhiên giá có thể hơi cao so với số lượng.",
        created_at: "2024-11-11 09:12:23.610225+07"
      },

      {
        review_id: 14,
        user_id: 1,
        food_id: 11,
        rating: JSON.stringify({
          "food_rating_delicious": 9.7,
          "food_rating_presentation": 9.0,
          "food_rating_price": 7.8,
          "food_rating_fresh": 10.0,
        }),
        comment: "Sữa chua mít rất tươi ngon, vị sữa chua mềm mịn và mít rất thơm, ngọt vừa phải. Món ăn này rất phù hợp với sở thích của tôi.",
        created_at: "2024-11-11 09:15:55.222788+07"
      },

      {
        review_id: 15,
        user_id: 2,
        food_id: 11,
        rating: JSON.stringify({
          "food_rating_delicious": 9.7,
          "food_rating_presentation": 7.0,
          "food_rating_price": 7.8,
          "food_rating_fresh": 9.0
        }),
        comment: "Sữa chua mít rất ngon, mít tươi và ngọt, sữa chua có vị thanh, mát lạnh. Tuy nhiên, giá cả hơi cao so với chất lượng.",
        created_at: "2024-11-11 09:12:23.610225+07"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('review_foods', null, {});
  }
};
