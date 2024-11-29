'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('restaurants',[
      {
        user_id: 1,
        name: "Bún bò Huế Ngự Uyển",
        address: "N4 A9 Đường Mỹ Đình (Đối Diện Số 88 Mỹ Đình), P. Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội",
        phone_number: "0328384155",
        website: "https://www.foody.vn/ha-noi/bun-bo-hue-ngu-uyen-my-dinh",
        description: "Bún Bò Huế Ngự Uyển nổi tiếng với tô bún đầy đủ thịt bò, giò, chả, trứng cút và các topping đặc biệt. Nước dùng ngọt tự nhiên từ xương hầm, bún sợi to chuẩn Huế. Phục vụ nhiệt tình và chu đáo.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_327ed68a-d201-45e8-b751-269b31324d28.jpg?alt=media&token=461f615c-aff1-449d-83dc-30d32289e2f0",
        rating: JSON.stringify({
          "restaurant_rating_service": 4.0, 
          "restaurant_rating_price": 4.0, 
          "restaurant_rating_food": 4.0, 
          "restaurant_rating_decoration": 4.0
        }),
        tags: ["Bò","Bún","Huế","Ẩm thực Việt","Món nước","Đặc sản","Truyền thống"],
      },

      {
        user_id: 1,
        name: "Kiroku Japanese Restaurant",
        address: "85 Đường Triệu Việt Vương, Bùi Thị Xuân, Quận Hai Bà Trưng, Hà Nội",
        phone_number: "0947286287",
        website: "https://www.gurutto-vietnam.com/detail/5283/index.html",
        description: "Kiroku Japanese Restaurant nổi bật với không gian Nhật Bản ấn tượng và rộng rãi, phù hợp cho cá nhân, gia đình, và đồng nghiệp. Nhà hàng chú trọng nguyên liệu tươi sống, mang đến trải nghiệm ẩm thực đa dạng với sushi, korokke, há cảo chiên, tempura tôm, salad, cari và lẩu.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_31ec0bc0-3ee4-4f4e-8f03-e469f7196a1f.jpg?alt=media&token=fb4db3ca-1a98-44ec-a7cb-950050070c7b",
        rating: JSON.stringify({
          "restaurant_rating_service": 9,
          "restaurant_rating_price": 9,
          "restaurant_rating_food": 9,
          "restaurant_rating_decoration": 9
        }),
        tags: ["Nhật Bản", "Phong cách Nhật", "Tươi sống", "Thanh lịch", "Sushi"],
      },

      {
        user_id: 1,
        name: "Azuma Japanese Restaurant",
        address: "Số 23 Ngọc Khánh, Giảng Võ, Quận Ba Đình, Hà Nội",
        phone_number: "0936427524",
        website: "https://www.lakesidehotel.net.vn/vi/azuma-japanese-restaurant/",
        description: "Azuma Japanese Restaurant tại Khách sạn Lake Side mang đến trải nghiệm ẩm thực Nhật Bản tinh tế với thực đơn phong phú gồm Sushi, Sashimi, Yakiniku, Teppan và Washoku, trong không gian hiện đại và trang nhã.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_c5f95260-c8e0-41d5-a74d-1787c09e68bf.jpg?alt=media&token=ba3c0ce6-a14e-492f-b326-8334a69678b4",
        rating: JSON.stringify({
          "restaurant_rating_service": 8.0,
          "restaurant_rating_price": 8.0,
          "restaurant_rating_food": 8.0,
          "restaurant_rating_decoration": 8.0
        }),
        tags: ["Nhật Bản", "phong cách Nhật", "Tươi sống", "Thanh lịch", "Tempura"],
      },

      {
        user_id: 1,
        name: "Mỳ Oshi 03",
        address: "25 Triệu Việt Vương, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội",
        phone_number: "0966365470",
        website: "https://www.order.capichiapp.com/vi/restaurants/capichistorefe72e6",
        description: "Mì Oshi 03 nổi tiếng với ramen chuẩn Nhật, không gian sang trọng. Bát mì lớn, sợi dai, nước dùng thanh và topping như thịt heo nướng, măng khô, rong biển, trứng lòng đào. Thực đơn phong phú với Misho, Salts, và Shio.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_71ebd0f0-e3fd-40a4-9f9c-dcd208707082.jpg?alt=media&token=cdfa8f46-995b-47ad-ab90-2e6683404407",
        rating: JSON.stringify({
          "restaurant_rating_service": 8.0,
          "restaurant_rating_price": 8.0,
          "restaurant_rating_food": 8.0,
          "restaurant_rating_decoration": 8.0
        }),
        tags: ["Nhà hàng Ramen", "Ẩm thực Nhật Bản", "Mì Nhật", "Mì Ramen", "Món ăn Nhật Bản", "Ramen ngon", "Mì tươi"],
      },

      {
        user_id: 2,
        name: "Phở Lý Quốc Sư",
        address: "Số 10 Võ Chí Công, Xuân La, Tây Hồ, Hà Nội",
        phone_number: "0349766666",
        website: "https://www.foody.vn/ha-noi/pho-ly-quoc-su",
        description: "Phở Lý Quốc Sư là một trong những điểm đến ẩm thực nổi tiếng tại Hà Nội, nổi bật với những tô phở thơm ngon và đậm đà hương vị truyền thống. Với bề dày lịch sử hơn 30 năm, nhà hàng đã khẳng định được vị thế của mình trong lòng thực khách yêu thích ẩm thực Việt.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_39e7ccb7-6f92-4961-b0c3-323e29aabea5.jpg?alt=media&token=8744a630-da6d-47ad-98d5-090313bab6e3",
        rating: JSON.stringify({
          "restaurant_rating_service": 8.5,
          "restaurant_rating_price": 7.0,
          "restaurant_rating_food": 9.0,
          "restaurant_rating_decoration": 6.8
        }),
        tags: ["Phở", "Ẩm thực Việt", "Đặc sản Hà Nội", "Truyền thống"],
      },

      {
        user_id: 2,
        name: "Habit BBQ",
        address: "Số 3 Dịch Vọng Hậu, quận Cầu Giấy",
        phone_number: "0933366288",
        website: "https://habitbbq.com.vn/",
        description: "Habit BBQ nổi tiếng với lẩu nướng không khói tại Dịch Vọng Hậu, Cầu Giấy. Thực đơn phong phú, món ăn tươi ngon và hệ thống bếp nướng hiện đại, là lựa chọn hàng đầu khi tìm kiếm nhà hàng lẩu nướng ngon tại khu vực này.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_0e6fadd1-e0df-4ad0-bd15-d35471ed3861.jpg?alt=media&token=24378951-b737-48c2-9ff6-ff578d58d2e3",
        rating: JSON.stringify({
          "restaurant_rating_service": 7.5,
          "restaurant_rating_price": 7.0,
          "restaurant_rating_food": 7.0,
          "restaurant_rating_decoration": 6.0
        }),
        tags: ["Barbecue", "Thịt nướng", "Lẩu nướng", "Thịt bò", "Thịt dê"],
      },

      {
        user_id: 2,
        name: "Chè Sầu Liên",
        address: "79 Trần Quốc Hoàn, Quận Cầu Giấy, Hà Nội",
        phone_number: "0934434402",
        website: "https://chelien.com.vn/",
        description: "Quán chè Sầu Liên nổi bật với chè sầu Liên chuẩn Đà Nẵng, topping đa dạng như rau câu, dừa nạo, cơm sầu riêng. Chè bưởi An Giang cũng rất thơm ngon với cùi bưởi và nước cốt dừa béo ngậy. Các món chè như chè dừa dầm, chè Thái thập cẩm, sữa chua mít cũng được ưa chuộng.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mobile-f903a.firebasestorage.app/o/restaurants%2Frn_image_picker_lib_temp_6714fa29-c172-4caf-833f-7a2811809617.jpg?alt=media&token=a26a9e40-eb24-4730-917e-3ead99b6599a",
        rating: JSON.stringify({
          "restaurant_rating_service": 7.0,
          "restaurant_rating_price": 9.0,
          "restaurant_rating_food": 7.0,
          "restaurant_rating_decoration": 6.0
        }),
        tags: ["Chè", "Giải khát", "Món nước", "Chè bưởi", "Chè Thái"],
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('restaurants', null, {});
  }
};
