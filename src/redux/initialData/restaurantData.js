const data = [
  {
    id: 1,
    title: 'HN Quán',
    tags: [1, 2, 3],
    image: require('../../../assets/eg/R.jpg'),
    address: '21 Cầu Giấy, Hà Nội',
    description: 'Quán này ngonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
    menu: ['Bánh táo', 'Bánh Chuối'],
    note: {
      'Thú cưng': true,
      'Ăn tại quán': false,
      'Hút thuốc': false,
    },
  },
  {
    id: 2,
    title: 'SG Quán',
    tags: [1, 3],
    image: require('../../../assets/eg/R.jpg'),
    address: '21 Cầu Giấy, Hà Nội',
    description: 'Quán này ngonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
    menu: ['Bánh táo', 'Bánh Chuối'],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 3,
    title: 'Paris Gateaux Bakery & Cafe',
    tags: [1, 3, 102, 103, 104],
    image: require('../../../assets/restaurants/Paris-Gateaux.jpg'),
    address: '68 Vũ Phạm Hàm, Trung Hoà, Cầu Giấy, Hà Nội',
    description: 'Paris Gateaux',
    menu: ['Tiramisu', 'Panna Cotta', 'Mousse', 'Black Forest'],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 4,
    title: 'Artemis Pastry & Coffee Shop',
    tags: [1],
    image: require('../../../assets/restaurants/corner-of-artemis.jpg'),
    address: '20 P. Ngô Quyền, Tràng Tiền, Hoàn Kiếm, Hà Nội',
    description: 'Artemis Pastry',
    menu: [
      'Bailey Caramel Brownie',
      'Burnt Caramel Signature',
      'Creamy Choco',
      'Berry Fruit Vanilla',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 5,
    title: 'Bún bò Huế An Cực - Đội Cấn',
    tags: [4],
    image: require('../../../assets/restaurants/bun-bo-hue.jpg'),
    address: '151 Đường Đội Cấn, Đội Cấn, Ba Đình, Hà Nội',
    description: 'Bún bò Huế thơm ngon mời bạn ăn nha',
    menu: ['Bún bò Huế đầy đủ', 'Bún bò Huế đặc biệt', 'Bún bò Huế thường'],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 6,
    title: 'Bánh đa cua cô Hằng',
    tags: [4],
    image: require('../../../assets/restaurants/banh-da-cua.jpg'),
    address: '64 Nguyễn Văn Tuyết, Trung Liệt, Đống Đa, Hà Nội',
    description: 'Bánh đa cua thơm ngon mời bạn ăn nha',
    menu: [
      'Bún cua',
      'Miến cua',
      'Bánh đa trắng cua',
      'Bánh đa đỏ cua',
      'Miến cá',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 7,
    title: 'Cơm thố - Tô Hiệu',
    tags: [5],
    image: require('../../../assets/restaurants/com-tho.jpg'),
    address: '201 Tô Hiệu, Nghĩa Tân, Cầu Giấy, Hà Nội',
    description: 'Cơm thố thơm ngon mời bạn ăn nha',
    menu: [
      'Cơm thố gà',
      'Cơm thố đặc biệt',
      'Cơm thố bò - xá xíu',
      'Cơm thố đặc biệt',
      'Cơm chiên Dương Châu',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 8,
    title: 'Chè Trang',
    tags: [6],
    image: require('../../../assets/restaurants/che-trang.jpg'),
    address: 'Ngõ 201 Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    description: 'Chè Trang thơm ngon mời bạn ăn nha',
    menu: [
      'Chè bưởi',
      'Chè thái sầu riêng',
      'Chè thập cẩm',
      'Dừa non hạnh nhân',
      'Xuka Caramen',
      'Hoa quả sữa chua',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 9,
    title: 'Bún đậu mắm tôm - Trần Quốc Vượng',
    tags: [5],
    image: require('../../../assets/restaurants/bun-dau-mam-tom.jpg'),
    address: 'Ngõ 63, Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    description: 'Bún đậu mắm tôm thơm ngon mời bạn ăn nha',
    menu: [
      'Bún đậu đầy đủ',
      'Bún đậu thịt + chả cốm',
      'Bún đậu thịt + nem',
      'Bún đậu thịt + lòng dồi',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 10,
    title: 'Dookki - Trần Duy Hưng',
    tags: [105],
    image: require('../../../assets/restaurants/dokki.jpg'),
    address:
      'Lầu 5-08 Vincom Center Star City, Ngã tư đường Trần Duy Hưng – Hoàng Minh Giám, Quận Cầu Giấy, Hà Nội.',
    description:
      'Dookki Việt Nam như phát súng nổ cho sự kết hợp giữa buffet và lẩu topokki, thay vì chỉ phục vụ kinh doanh các món tokbokki riêng lẻ. Tạo nên xu thế mới trong phong cách thưởng thức món Hàn dành cho giới trẻ Việt Nam.',
    menu: ['bánh gạo'],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 11,
    title: 'Hadilao',
    tags: [105],
    image: require('../../../assets/restaurants/hadilao.jpg'),
    address:
      'Tầng 5, TTTM Vincom Mega Mall Timescity, 458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, ​​Hà Nội',
    description:
      'Được thành lập từ năm 1994, Haidilao là chính là một minh chứng sống cho sự kiên trì, bền bỉ để dẫn đến thành công của chủ thương hiệu này. Ban đầu đây chỉ là một cửa hàng nhỏ, trải qua nhiều thăng trầm đã trở thành một thương hiệu lớn độc nhất và thuộc top các quán lẩu ngon ở Hà Nội gây sốt cộng động ẩm thực.',
    menu: [
      'lẩu cay',
      'lẩu cà chua',
      'lẩu chua cay',
      'lẩu hầm xương với nấm',
      'đồ nhúng lẩu',
      'nước chấm',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
  {
    id: 12,
    title: 'Pizza Company',
    tags: [102],
    image: require('../../../assets/restaurants/pizza-company.jpg'),
    address: '333 Đ. Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội',
    description:
      'The Pizza Company là một chuỗi nhà hàng và nhượng quyền quốc tế có trụ sở tại Bangkok, Thái Lan.',
    menu: [
      'Pizza Phượng Hoàng',
      'Pizza Hải Sản Pesto Xanh',
      'Pizza Hải Sản Cocktail',
      'Pizza Hải Sản Đào',
      'Mì Ý Cay Hải Sản',
      'Mì Ý thịt bò bằm',
    ],
    note: {
      'Ăn tại quán': true,
      'Hút thuốc': false,
    },
  },
];

const lastKey = data.length;

export const RESTAURANT_DATA = {data, lastKey};
