import { CafeModel, DummyModel } from '@db/cafe/CafeModel';

export const InsertDummy = async (dummy: any) => {
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
  } = await dummy;
  // name, cafe_phone 은 스키마 작성 후 추가 또는 Drop
  const cafe_info = { cafe_name, location, address: address + ' ' + address_detail, phone };
  const discount_rate = { silver, gold, vip };
  const special = { cafe_info, discount_rate, owner_id, cafe_id: 110022 /* cafe_id: 수정 필요 */ };
  try {
    const data = new DummyModel({ ...special });
    return data.save();
  } catch (err) {
    console.log(err);
  }
};

export const PermitEnroll = (params: any) => {
  const { owner_id, phone, cafe_name, address, silver, gold, vip } = params;
  const cafe_info = { cafe_name, address, phone };
  const discount_rate = { silver, gold, vip };
  const special = { cafe_info, discount_rate, owner_id, cafe_id: 12 };
  const newCafe = new CafeModel({ ...special });
  return newCafe.save();
};
