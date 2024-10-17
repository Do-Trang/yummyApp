// Tags and ingredients should have lowercased title

// 1. Proteins
// 2. Dairies - thực phẩm bơ sữa
// 3. Cereals - ngũ cốc, bột mì
// 4. Vegetable
// 5. Fruits
// 6. Alcohols - có cồn
// 7. Others
const data = [
  {
    id: 101,
    title: 'trứng',
  },
  {
    id: 102,
    title: 'thịt bò',
  },
  {
    id: 103,
    title: 'ốc',
  },
  {
    id: 104,
    title: 'thịt gà',
  },
  {
    id: 105,
    title: 'chân giò',
  },
  {
    id: 106,
    title: 'thịt lợn',
  },
  {
    id: 107,
    title: 'xúc xích',
  },
  {
    id: 108,
    title: 'đậu',
  },
  {
    id: 109,
    title: 'nem',
  },
  {
    id: 110,
    title: 'tôm',
  },
  {
    id: 111,
    title: 'bò khô',
  },
  {
    id: 112,
    title: 'chân gà',
  },
  {
    id: 113,
    title: 'thịt xiên',
  },
  {
    id: 201,
    title: 'sữa',
  },
  {
    id: 202,
    title: 'bơ',
  },
  {
    id: 203,
    title: 'mascarpone',
  },
  {
    id: 204,
    title: 'heavy cream',
  },
  {
    id: 205,
    title: 'whipping cream',
  },
  {
    id: 206,
    title: 'Tào phớ',
  },
  {
    id: 207,
    title: 'Kem',
  },
  {
    id: 208,
    title: 'phô mai que',
  },
  {
    id: 301,
    title: 'bột mì',
  },
  {
    id: 302,
    title: 'bún',
  },
  {
    id: 303,
    title: 'phở',
  },
  {
    id: 304,
    title: 'phở cuốn',
  },
  {
    id: 305,
    title: 'xôi',
  },
  {
    id: 306,
    title: 'Bánh mì',
  },
  {
    id: 307,
    title: 'Lạc',
  },
  {
    id: 307,
    title: 'Bánh giò',
  },
  {
    id: 401,
    title: 'dưa chuột',
  },
  {
    id: 402,
    title: 'xà lách',
  },
  {
    id: 403,
    title: 'đu đủ',
  },
  {
    id: 404,
    title: 'xoài',
  },
  {
    id: 501,
    title: 'táo',
  },
  {
    id: 502,
    title: 'dâu tây',
  },
  {
    id: 503,
    title: 'anh đào',
  },
  {
    id: 601,
    title: 'rượu marsala',
  },
  {
    id: 701,
    title: 'cà phê',
  },
  {
    id: 702,
    title: 'bột cacao',
  },
  {
    id: 703,
    title: 'hạnh nhân',
  },
  {
    id: 704,
    title: 'chocolate',
  },
  {
    id: 705,
    title: 'bột gelatin',
  },
  {
    id: 706,
    title: 'caramen',
  },
  {
    id: 707,
    title: 'sương sáo',
  },
  {
    id: 708,
    title: 'trân châu',
  },
  {
    id: 801,
    title: 'thịt nguội',
  },
];

const lastKey = data.length;

export const INGREDIENT_DATA = {data, lastKey};
