import {CafeModel} from "@db/cafe/CafeModel";

export const SaveCafe = () => {
  new CafeModel({
    cafe_info: {
      cafe_img: '카페 이미지',
      card_img: '카드 이미지',
      like: 0,
      introduction: '카페 소개',
      cafe_name: '카페A',
      location: '37.392322870446684, 126.99560860167533',
      beans: '원두 소개',
      address: '상암동',
      phone: '010-001-001',
    },
    discount_rate: {
      silver: 2,
      gold: 3,
      vip: 5,
    },
    owner_id: 11,
    point_fluc: -7000,
    cafe_id: 10,
  }).save();
};
