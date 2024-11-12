'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('foods', [
      {
        food_id: 1,
        user_id: 2,
        name: 'Phở bò tái',
        description: 'Phở bò tái gồm sợi phở mềm mịn và nước dùng ninh từ xương bò, mang hương vị ngọt tự nhiên. Thịt bò tái thái mỏng được cho vào bát phở và chín tái khi tiếp xúc với nước dùng nóng. Món ăn thường kèm rau thơm như húng quế, ngò gai, giá đỗ và chanh tươi để tăng thêm hương vị.',
        price: 40000,
        restaurant_id: 5,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_7b0292d3-f488-4544-a404-b492e9aee1fe.jpg?alt=media&token=9924bf66-9a32-4cc0-996c-9c67d5c2d56d',
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 8.2,
          "food_rating_price": 8,
          "food_rating_fresh": 9.5
        }),
        tags: ['Phở', 'Bò', 'Món nước', 'Việt Nam', 'Truyền thống']
      },

      {
        food_id: 2,
        user_id: 2,
        name: 'Phở gà',
        description: 'Phở gà gồm sợi phở mềm mịn, nước dùng ninh từ xương gà mang hương vị ngọt tự nhiên. Thịt gà xé sợi, chín tới, cùng với trứng trần được cho vào bát phở và thưởng thức cùng với rau thơm như húng quế, giá đỗ và chanh tươi để tăng thêm hương vị.',
        price: 50000,
        restaurant_id: 5,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_dc805523-69fc-491a-b242-3ecb985ccef9.jpg?alt=media&token=195bfd67-d7f9-412b-a1bb-3dafbd1ba29b',
        rating: JSON.stringify({
          "food_rating_delicious": 9.0,
          "food_rating_presentation": 8.0,
          "food_rating_price": 9.0,
          "food_rating_fresh": 9.5
        }),
        tags: ['Phở', 'Gà', 'Món nước', 'Việt Nam', 'Truyền thống', 'Trứng']
      },

      {
        food_id: 3,
        user_id: 1,
        name: 'Bún bò Huế',
        description: 'Bún bò Huế là món ăn đặc sản nổi tiếng của miền Trung Việt Nam, với sợi bún to và nước dùng ninh từ xương bò, tạo vị ngọt tự nhiên. Nước dùng có màu đỏ đặc trưng nhờ gia vị như mắm ruốc và ớt. Món ăn được phục vụ với nhiều topping phong phú như thịt bò, giò lụa, chả bò, trứng cút, và rau sống, mang đến hương vị đậm đà và trải nghiệm ẩm thực độc đáo.',
        price: 40000,
        restaurant_id: 1,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_6d7ffd7a-8a12-4140-8857-810e4da8b1cc.jpg?alt=media&token=2af08ac3-b4f6-4ca9-95b7-6cff5dcb553d',
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 9,
          "food_rating_price": 9,
          "food_rating_fresh": 9.5
        }),
        tags: ['Bún Bò Huế', 'Đặc sản miền Trung', 'Ẩm thực Việt Nam', 'Truyền thống', 'Bún sợi to', 'Topping đa dạng', 'Huế']
      },

      {
        food_id: 4,
        user_id: 1,
        name: 'Ramen',
        description: 'Ramen là món mì của Nhật Bản, với sợi mì mềm dai kết hợp nước dùng đậm đà từ xương và gia vị. Mỗi bát ramen thường được phục vụ với các loại topping như thịt heo, trứng lòng đào, măng, và rong biển. Nước dùng có thể thay đổi theo vùng miền, từ vị mặn của Shio, vị béo của Tonkotsu đến vị đậu nành đặc trưng của Shoyu, mang đến trải nghiệm đa dạng và hấp dẫn cho thực khách.',
        price: 60000,
        restaurant_id: 4,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_3439ef30-7d55-4135-98da-a7cb8da41b0b.jpg?alt=media&token=911a411c-63f7-4bbd-b80c-176ce76e910c',
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 9,
          "food_rating_price": 9,
          "food_rating_fresh": 9.5
        }),
        tags: ['Ramen', 'Món Nhật Bản', 'Mì Nhật', 'Ẩm thực Nhật', 'Mì nước']
      },

      {
        food_id: 5,
        user_id: 1,
        name: 'Tempura',
        description: 'Tempura là món ăn truyền thống Nhật Bản gồm các loại hải sản hoặc rau củ được tẩm bột mỏng và chiên giòn. Với lớp bột chiên nhẹ, giòn tan, tempura giữ được hương vị tươi ngon của nguyên liệu bên trong mà không quá béo. Thường được dùng kèm với nước chấm nhẹ và củ cải bào, tempura mang đến trải nghiệm ẩm thực tinh tế và hài hòa.',
        price: 100000,
        restaurant_id: 3,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_f5db29c0-dc18-4d5f-a982-4cfd74e0bbb4.jpg?alt=media&token=a39a4624-3c53-467f-9bc7-3ab4983db9ff',
        rating: JSON.stringify({
          "food_rating_delicious": 9.8,
          "food_rating_presentation": 8.2,
          "food_rating_price": 8,
          "food_rating_fresh": 9.5
        }),
        tags: ['tempura', 'ẩm thực Nhật Bản', 'hải sản', 'rau củ', 'món chiên', 'giòn tan']
      },

      {
        food_id: 6,
        user_id: 1,
        name: 'Sushi',
        description: 'Sushi là một món ăn truyền thống của Nhật Bản, nổi bật với sự kết hợp giữa cơm và hải sản tươi sống. Cơm sushi được chế biến từ gạo đặc biệt và trộn với giấm. Có nhiều loại sushi như nigiri (cơm nắm tay với hải sản phía trên), maki (cuộn sushi trong tảo biển) và sashimi (hải sản tươi sống). Không chỉ ngon miệng, sushi còn được trình bày đẹp mắt.',
        price: 50000,
        restaurant_id: 2,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_7d69d2bc-aa64-4251-9a56-d12fd97f7d9f.jpg?alt=media&token=d8d1fa92-a043-4576-83a2-2512bcaef230',
        rating: JSON.stringify({
          "food_rating_delicious": 9,
          "food_rating_presentation": 8.5,
          "food_rating_price": 9,
          "food_rating_fresh": 9.5
        }),
        tags: ['Sushi', 'ẩm thực Nhật Bản', 'hải sản', 'tươi sống', 'cá sống', 'thanh đạm', 'cơm cuộn']
      },

      {
        food_id: 7,
        user_id: 1,
        name: 'Cơm bò Wagyu',
        description: 'Cơm bò Wagyu là món ăn đặc biệt với phần thịt bò Wagyu mềm, mỡ hòa quyện, được chế biến với độ chín hoàn hảo và ăn kèm cơm trắng dẻo thơm. Món ăn thường được trang trí với rau củ tươi và nước sốt đặc biệt, mang đến một trải nghiệm ẩm thực đẳng cấp với hương vị ngọt ngào, béo ngậy.',
        price: 150000,
        restaurant_id: 2,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_5e4f7878-d35b-4b8b-87da-c39f49afaa1a.jpg?alt=media&token=da1fdbc2-4c47-4911-9361-b49d7362981f',
        rating: JSON.stringify({
          "food_rating_delicious": 9.9,
          "food_rating_presentation": 9,
          "food_rating_price": 9.5,
          "food_rating_fresh": 9.5
        }),
        tags: ['Cơm', 'Bò Wagyu', 'Ẩm thực Nhật Bản', 'Món cao cấp', 'Thịt bò', 'Béo ngậy']
      },

      {
        food_id: 8,
        user_id: 2,
        name: 'Sườn cừu nướng',
        description: 'Sườn cừu nướng với gia vị đặc biệt và sốt BBQ, được nướng trên than hồng, mang đến hương vị đậm đà, thơm ngon, thích hợp cho những người yêu thích món nướng.',
        price: 120000,
        restaurant_id: 6,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_959b8dee-7492-4729-bd0f-c5298d99c475.png?alt=media&token=f6c5f97b-61a4-47c7-b470-f660289a5351',
        rating: JSON.stringify({
          "food_rating_delicious": 9.7,
          "food_rating_presentation": 9.2,
          "food_rating_price": 7.0,
          "food_rating_fresh": 9.5
        }),
        tags: ['Barbecue', 'Sườn cừu', 'Nướng', 'Món ăn Mỹ', 'BBQ', 'Thịt cừu']
      },

      {
        food_id: 9,
        user_id: 2,
        name: 'Tào phớ trân châu đường đen',
        description: 'Tào phớ trân châu đường đen là một món tráng miệng nổi tiếng, kết hợp giữa tào phớ mềm mịn, trân châu dẻo và nước đường đen ngọt ngào. Món ăn này không chỉ có vị ngọt thanh mà còn mang lại cảm giác bùi bùi, béo ngậy, tạo nên sự kết hợp hoàn hảo cho những ai yêu thích món ngọt. Món này thường được dùng lạnh, rất thích hợp vào những ngày hè oi ả.',
        price: 15000,
        restaurant_id: 7,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_7e9e3e32-764c-42a7-b61c-31610d251705.jpg?alt=media&token=862a7231-f69e-42c2-a446-cffc20792b58',
        rating: JSON.stringify({
          "food_rating_delicious": 9.5,
          "food_rating_presentation": 8.5,
          "food_rating_price": 8,
          "food_rating_fresh": 9
        }),
        tags: ['Tào phớ', 'Trân châu', 'Món ngọt', 'Tráng miệng']
      },
      
      {
        food_id: 10,
        user_id: 2,
        name: 'Chè Thái',
        description: 'Chè Thái là một món chè nổi bật trong ẩm thực Việt Nam, được làm từ các loại trái cây tươi ngon như mít, xoài, dưa hấu, và thạch, cùng với nước cốt dừa béo ngậy. Món chè này không chỉ thơm ngon mà còn mang đến một sự kết hợp thú vị giữa vị ngọt tự nhiên của trái cây và sự mát lạnh của nước cốt dừa, tạo nên một món ăn tráng miệng tuyệt vời cho mọi lứa tuổi. Chè Thái thường được thưởng thức trong những buổi chiều hè mát mẻ.',
        price: 15000,
        restaurant_id: 7,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_cc85940f-a956-4e24-ac82-081347befc8d.jpg?alt=media&token=f0c8a1a8-bd06-44f5-a6e7-f1fed46fbef1',
        rating: JSON.stringify({
          "food_rating_delicious": 9.2,
          "food_rating_presentation": 8.8,
          "food_rating_price": 7.5,
          "food_rating_fresh": 9.5
        }),
        tags: ['Chè', 'Trái cây', 'Món ngọt', 'Tráng miệng']
      },

      {
        food_id: 11,
        user_id: 2,
        name: 'Sữa chua mít',
        description: 'Sữa chua mít là món ăn tráng miệng quen thuộc trong ẩm thực Việt Nam, kết hợp giữa sữa chua mát lạnh và mít tươi ngon, tạo thành một món ăn ngọt ngào, thơm lừng. Những miếng mít chín mềm được kết hợp với sữa chua tạo nên sự hòa quyện tuyệt vời giữa vị ngọt tự nhiên của trái cây và độ mát của sữa chua. Món ăn này không chỉ ngon miệng mà còn bổ dưỡng, thích hợp cho mọi lứa tuổi.',
        price: 15000,
        restaurant_id: 7,
        image_url: 'https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/foods%2Frn_image_picker_lib_temp_d1df17cc-e448-4264-92b3-4a3f2676de80.jpg?alt=media&token=ae11ecb9-4ece-41f6-9e87-c4d54824c675',
        rating: JSON.stringify({
          "food_rating_delicious": 9.7,
          "food_rating_presentation": 8.0,
          "food_rating_price": 7.8,
          "food_rating_fresh": 9.5
        }),
        tags: ['Sữa chua', 'Mít', 'Món ngọt', 'Tráng miệng']
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('foods', null, {});
  }
};
