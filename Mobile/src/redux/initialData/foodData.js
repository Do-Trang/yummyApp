const data = [
  {
    id: 1,
    title: 'Bánh táo',
    tags: [1, 2],
    ingredients: [101, 301, 501],
    image: require('../../../assets/foods/Mini-Apple-Pies.png'),
    description:
      'Apple Pie - bánh Pie nhân táo là một món bánh bảo dễ cũng đúng mà bảo khó cũng không sai. Dễ là bởi vì làm rất nhanh, không có nhiều thao tác, chỉ nhồi, cán bột rồi cho nhân vào, mang đi nướng. Khả năng hỏng (theo nghĩa không ăn được) – là cực thấp. Còn khó là bởi vì tuy không có nhiều khâu, nhưng ở mỗi khâu đều cần cẩn thận và kĩ thuật tốt, lệch đi một tẹo thôi là bánh có thể không đạt yêu cầu rồi.',
    address: ['địa chỉ 1', 'địa chỉ 2'],
  },
  {
    id: 2,
    title: 'Bún bò Huế',
    tags: [4, 101],
    ingredients: [102, 302],
    image: require('../../../assets/foods/bun-bo-Hue.jpg'),
    description: 'Bún này ngonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
    address: ['địa chỉ 1', 'địa chỉ 2'],
  },
  {
    id: 3,
    title: 'Egg Benedict',
    tags: [3],
    ingredients: [101, 202, 801],
    image: require('../../../assets/foods/egg-benedict.jpg'),
    description:
      'Bữa sáng truyền thống với nguyên liệu chủ đạo là trứng. Bao gồm trứng chần (poached egg), thịt nguội, bánh nướng xốp (English muffin) và xốt Hollandaise. Món ăn đơn giản nhưng tinh tế và yêu cầu kỹ năng cao của người đầu bếp',
    address: ['địa chỉ 1', 'địa chỉ 2'],
  },
  {
    id: 4,
    title: 'Tiramisu',
    tags: [1, 3, 102],
    ingredients: [301, 101, 203, 701, 601, 702],
    image: require('../../../assets/foods/tiramisu.jpg'),
    description:
      'Khi thưởng thức, tiramisu có vị thanh ngọt nhẹ nhàng, hơi hơi nồng của mùi rượu, thơm đậm đà mùi cà phê. Sự kết hợp hài hoà này giúp Tiramisu dễ chiếm được cảm tình của nhiều người yêu ẩm thực.',
    address: ['Paris Gateaux'],
  },
  {
    id: 5,
    title: 'Bánh Opera',
    tags: [1, 3, 103],
    ingredients: [301, 101, 703, 701, 202, 704],
    image: require('../../../assets/foods/opera-cake.jpg'),
    description:
      'Một chút đắng nhẹ từ socola, một chút man mát từ kem tươi, vị ngọt ngào từ gato hạnh nhân…hương vị đặc biệt này chắc chắn sẽ chinh phục được gu thưởng thức của khách hàng, kể cả những thực khách khó tính.',
    address: ['Paris Gateaux'],
  },
  {
    id: 6,
    title: 'Chocolate Mousse',
    tags: [1, 3, 103],
    ingredients: [101, 204, 701, 702],
    image: require('../../../assets/foods/chocolate-mousse1.jpg'),
    description:
      'Dark chocolate and espresso add the slightly bitter notes needed to balance this easy chocolate mousse. Remember, the higher the cacao percentage, the less sweet the chocolate.',
    address: [],
  },
  {
    id: 7,
    title: 'Panna Cotta Dâu tây',
    tags: [1, 102],
    ingredients: [205, 705, 502],
    image: require('../../../assets/foods/strawberry-panna-cotta.jpg'),
    description:
      'Panna Cotta is a classic italian dessert made with heavy cream, vanilla and sugar. Gelatin sheets, added to the mixture, create a custard-like consistency.',
    address: [],
  },
  {
    id: 8,
    title: 'Black Forest',
    tags: [1, 3, 104],
    ingredients: [301, 101, 704, 503, 702],
    image: require('../../../assets/foods/black-forest.jpg'),
    description:
      'Khéo léo kết hợp với anh đào đen và thạch anh đào tạo nên một chiếc bánh có hương vị ấn tượng, vị kem béo ngậy, ngọt thanh vừa phải, vị thạch anh đào thơm ngon, dai giòn. Lớp xung quanh bánh là socola bào được phủ kín, nhìn rất lạ mắt và kích thích vị giác.',
    address: ['Paris Gateaux'],
  },
  {
    id: 9,
    title: 'Bún Ốc Hà Nội',
    tags: [4, 101],
    ingredients: [302, 103],
    image: require('../../../assets/foods/bun-oc.jpg'),
    description:
      'Món bún ốc Hà Nội trứ danh được làm từ nguyên liệu đơn giản và dân dã gồm: ốc văn hoặc ốc nhồi, bún, cà chua, rau thơm kèm gia vị là món ăn ngon Hà Nội được lòng du khách gần xa. Màu sắc món ăn bắt mắt, hương vị nước ốc đậm đà được người Hà Nội chọn làm bữa sáng hoặc bữa trưa cho gia đình.',
    address: [
      '36 Lương Ngọc Quyến, Q. Hoàn Kiếm',
      '57 Hai Bà Trưng, Q, Hoàn Kiếm',
      'Tầng trệt, 354 Bạch Mai, Q.Hai Bà Trưng',
    ],
  },
  {
    id: 10,
    title: 'Phở Hà Nội',
    tags: [4, 101],
    ingredients: [303, 102, 104, 105],
    image: require('../../../assets/foods/pho.jpg'),
    description:
      'Phở Hà Nội là món ăn truyền thống lâu đời, mang hương vị riêng của đất Bắc. Sự khác biệt dễ nhận thấy nhất giữa phở Hà Nội và phở trong Nam chính là bánh phở dẹp và to hơn, đồng thời, một số nơi sẽ ăn kèm phở với quẩy. Khách du lịch Hà Nội có thể chọn phở gà, phở bò hay phở ngan tùy theo sở thích ăn uống của mỗi người.',
    address: [
      '49 Bát Đàn, Q.Hoàn Kiếm',
      '13 Lò Đúc, Q.Hai Bà Trưng',
      '25 Hàng Giấy, Q.Hoàn Kiếm.',
    ],
  },
  {
    id: 11,
    title: 'Phở Cuốn Hà Nội',
    tags: [5, 101],
    ingredients: [304, 106, 101, 107, 401, 402],
    image: require('../../../assets/foods/pho-cuon.jpg'),
    description:
      'Phở cuốn Hà Nội là món ngon Hà Nội quen thuộc của người dân thủ đô. Món ăn được làm từ bánh phở, gói bên trong là thịt, rau chả, hành, giá, v.v... Vị ngọt thanh vừa miệng từ thịt, rau và nước chấm khiến nó trở thành món ăn xế khoái khẩu thơm ngon lại không quá đầy bụng.',
    address: [
      '25 Ngũ Xá, Q.Ba Đình',
      '35 Nguyễn Khắc Hiếu, Q.Ba Đình',
      '233A Tô Hiệu, Q.Cầu Giấy',
    ],
  },
  {
    id: 12,
    title: 'Xôi Khúc Hà Nội',
    tags: [5, 101],
    ingredients: [305, 106, 101, 107, 401],
    image: require('../../../assets/foods/xoi-khuc.jpg'),
    description:
      'Xôi khúc hay bánh khúc là một trong những món ăn tạo nên nét đẹp ẩm thực cổ truyền Hà Nội. Bánh có dạng khối tròn, bên trong nhân đậu xanh nhuyễn cùng thịt heo cắt nhỏ, cùng gia vị. Mua bánh khúc làm quà đặc sản Hà Nội sẽ rất tuyệt nó chứa đựng đầy đủ hương đồng cỏ nội, mùi vị lúa nếp quê hương.',
    address: [
      '69B Nguyễn Công Trứ, Phố Huế, Q.Hai Bà Trưng',
      '35 Cầu Gỗ, Hàng Bạc, Q.Hoàn Kiếm',
    ],
  },
  {
    id: 13,
    title: 'Bánh Mì Sốt Vang Hà Nội',
    tags: [5, 101],
    ingredients: [306, 106, 101, 107, 401],
    image: require('../../../assets/foods/banh-mi-sot-vang.jpg'),
    description:
      'Thời tiết lành lạnh tại Hà Nội là lúc tuyệt nhất để bạn thưởng thức món bánh mì sốt vang. Bánh mì nướng vàng giòn chấm cùng sốt vang đậm đà cùng thịt bò mềm. Món ăn sáng nhẹ nhàng, vừa đủ no để bạn bắt đầu một ngày mới là đây chứ đâu. ',
    address: [
      'ngõ 35 Thái Thịnh, ngã Tư Sở, Đống Đa',
      'Tiệm số 252 Hàng Bông, Cửa Nam, Hoàn Kiếm',
      '30 Đình Ngang, quận Hoàn Kiếm',
    ],
  },
  {
    id: 14,
    title: 'Bánh giò',
    tags: [5, 101],
    ingredients: [307, 106, 401],
    image: require('../../../assets/foods/banh-gio.jpg'),
    description:
      'Bánh giò là món ăn dân dã của người dân Hà Nội, rất dễ tìm thấy ở cách hàng quán ăn vặt hay được rao bán trên các con phố. Bánh được gói cẩn thận trong lớp lá chuối dày và cầu kỳ. Phần nhân thịt mặn bên trong có vị vừa miệng và béo ngậy. Một chiếc bánh giò lúc đói sẽ giúp bạn giữ ấm và no lâu trong suốt nhiều tiếng đồng hồ.',
    address: ['33 Đông Các, quận Đống Đa, Hà Nội'],
  },
  {
    id: 15,
    title: 'Bún Đậu Mắm Tôm',
    tags: [5, 101],
    ingredients: [302, 106, 108, 109, 401],
    image: require('../../../assets/foods/bun-dau-mam-tom.jpg'),
    description:
      'Bún đậu mắm tôm là món ngon Hà Nội “gây sốt” một thời với nguyên liệu hết sức dân dã. Một ít bún, vài miếng đậu, ăn kèm mắm tôm, rau kinh giới, tía tô, mùi tàu bạn sẽ cảm nhận được vị béo của đậu, mặn ngọt của mắm tôm. Những ai ăn lần đầu sẽ cảm giác hơi “dội” với vị nồng, nhưng dần dà sẽ bị nghiện đó nhé!',
    address: [
      '1B Ngõ Trạm, Q.Hoàn Kiếm',
      '49 ngõ Phất Lộc, Hàng Bạc',
      '129 Đại La, Q.Hai Bà Trưng',
    ],
  },
  {
    id: 16,
    title: 'Tào phớ',
    tags: [5, 101],
    ingredients: [206, 307, 706, 707, 708],
    image: require('../../../assets/foods/tao-pho.jpg'),
    description:
      'Tào phớ hay còn gọi là đậu hủ hoặc tàu hủ ở miền Nam. Món ăn khá quen thuộc nhưng khi ăn tại Hà Nội, người ta mới thấy cảm nhận được hết mùi vị đặc trưng và truyền thống của nó. Tào phớ Hà Nội được biến tấu ăn kem với bánh flan (caramen), sương sáo, trân châu dai và nước đường tạo nên hương vị thơm ngọt mát lành.',
    address: [
      '50 Thái Hà, Đống Đa',
      '28 Quang Trung, Hoàn Kiếm',
      '172 Đại Từ, Hoàng Mai',
    ],
  },
  {
    id: 17,
    title: 'Bánh Tôm',
    tags: [6, 101],
    ingredients: [301, 110],
    image: require('../../../assets/foods/banh-tom.jpg'),
    description:
      'Bánh tôm được làm từ tôm nước ngọt bọc bột mì chiên lên, tạo thành những chiếc bánh thơm ngon, giòn tan. Vỏ bột bánh giòn, có vị bùi bùi ngọt ngọt của đậu xanh nhuyễn. Nhân tôm hơi bé nhưng được cái tươi, thịt ngọt và tẩm ướp rất vừa miệng. Dù chỉ là một món ăn vặt vỉa hè chiên rán, nhưng món bánh tôm này thu hút nhiều thực khách, đặc biệt là người thích khám phá món ngon Hà Nội. ',
    address: [
      '55 Hàng Bồ, Hoàn Kiếm',
      'số 1 Thanh Niên, Tây Hồ',
      'ngõ Đồng Xuân, Hàng Chiếu, Hoàn Kiếm',
    ],
  },
  {
    id: 18,
    title: 'Kem Tràng Tiền',
    tags: [6, 101],
    ingredients: [207],
    image: require('../../../assets/foods/kem-trang-tien.jpg'),
    description:
      'Thương hiệu Kem Tràng Tiền đã có từ rất lâu đời, nằm ở vị trí ngay trung tâm thủ đô. Người ta tìm đến thưởng thức kem Tràng Tiền không chỉ vì vị ngon ngọt, mát lạnh của nó, mà còn để sống lại những ký ức tuổi thơ. Nếu bạn đang tìm kiếm những hương vị kem truyền thống như cốm, đậu xanh, sữa dừa, cacao... thì hãy ghé ngay đến kem Tràng Tiền.',
    address: ['35 Tràng Tiền, quận Hoàn Kiếm, Hà Nội.'],
  },
  {
    id: 19,
    title: 'Nộm Bò Khô',
    tags: [6, 101],
    ingredients: [403, 404, 106, 307, 110, 111],
    image: require('../../../assets/foods/nom-bo-kho.jpg'),
    description:
      'Tại Hà Nội, khi nhắc đến nộm, người ta sẽ nghĩ ngay đến món nộm bò khô Hà Nội thơm ngon với miếng bò khô cắt miếng tẩm vị tạo độ dai vừa phải, kết hợp đu đủ sợi xanh ăn cùng rau thơm, đậu phộng rang và nước sốt chua ngọt phải nói cực hấp dẫn.',
    address: [
      '16B Đường Thành,  Q.Hoàn Kiếm',
      'Ngõ 1 Nghĩa Tân, Q.Cầu Giấy',
      '21 Đặng Trần Côn, Q.Đống Đa',
    ],
  },
  {
    id: 20,
    title: 'Xiên bẩn',
    tags: [6, 101],
    ingredients: [107, 110, 112, 113, 208],
    image: require('../../../assets/foods/xien-ban.jpg'),
    description:
      'Xiên bẩn là món ăn quen thuộc của các bạn học sinh, sinh viên. Giá cả hợp lý, hương vị tuyệt vời khiến ta càng ăn càng cuốn',
    address: [
      'ngõ 130 Xuân Thủy',
      'Xiên Que Đại Học Hà Nội',
      'Dọc phố Tạ Quang Bửu',
      'Ngõ tự do Neu',
    ],
  },
];

const lastKey = data.length;

export const FOOD_DATA = {data, lastKey};
