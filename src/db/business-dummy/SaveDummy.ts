import { CafeModel, DummyModel } from '@db/cafe/CafeModel';

export const InsertDummy = (dummy: any) => {
  const {
    location,
    owner_id,
    name,
    phone,
    cafe_name,
    address,
    address_detail,
    cafe_phone,
    silver,
    gold,
    vip,
  } = dummy;
  try {
    const dumm = new DummyModel({
      cafe_info: {
        like: 0,
        cafe_name: cafe_name,
        location: '37.39227644637707, 126.99500276479165',
        address: address + ' ' + address_detail,
        phone: cafe_phone,
      },
      discount_rate: {
        silver: silver,
        gold: gold,
        vip: vip,
      },
      owner_id: owner_id,
      point_fluc: 0,
      cafe_id: 110022,
    });
    return dumm.save();
  } catch (err) {
    console.log(err);
  }
};

export const PermitEnroll = (params: any) => {
  const { owner_id, phone, cafe_name, address, silver, gold, vip } = params;
  const newCafe = new CafeModel({
    cafe_info: {
      cafe_name: cafe_name,
      address: address,
      phone: phone,
    },
    discount_rate: {
      silver: silver,
      gold: gold,
      vip: vip,
    },
    owner_id: owner_id,
    point_fluc: 0,
    cafe_id: 1010,
  });
  return newCafe.save();
};
