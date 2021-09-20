export const fakeUserData = {
  _id: { $oid: '613f649034daca4b8a321746' },
  cafe_info: {
    cafe_img: [],
    like: { $numberInt: '0' },
    _id: { $oid: '613eff01916e7c4a5d8f61a0' },
    introduction: '카페 소개란...123',
    cafe_name: '행복을전합니다 스타벅스',
    position: '37.39227644637707, 126.99500276479165',
    beans: '원두',
    address: '주소',
    phone: '010-001-001',
  },
  discount_rate: {
    silver: { $numberInt: '2' },
    gold: { $numberInt: '3' },
    vip: { $numberInt: '5' },
  },
  __v: { $numberInt: '0' },
  owner_id: '지성현',
  point_fluc: { $numberInt: '-7000' },
  cafe_id: { $numberInt: '142020' },
  staff: [
    {
      enroll: false,
      staff_phone: '010-2345-3456',
      staff_position: '직원',
      _id: { $oid: '613c80e4797c7d1f7aa354ac' },
      staff_name: '유성현',
      staff_id: '1100',
    },
  ],
};
