import { CafeModel, DummyModel } from '@db/cafe/CafeModel';
import { UserModel } from '@db/user/UserModel';
import { MenuModel } from '@db/menu/MenuModel';
import { MemberModel } from '@db/member/MemberModel';

export const SaveTempCafe = async (dummy: any) => {
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
  const newBody = {
    cafe_info: { cafe_name, location, address, address_detail, phone },
    discount_rate: { silver, gold, vip },
    owner_id,
    cafe_id: 110022 /* cafe_id: 수정 필요 */,
  };
  try {
    const data = new DummyModel({ ...newBody });
    await data.save();
    // 카페 등록하면 db.users.user.member의 상태도 업데이트 해주어야 함
    await MemberModel.findOneAndUpdate({ id: owner_id }, { $set: { member: 200 } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const PermitEnroll = async (params: any) => {
  const { owner_id, phone, cafe_name, address, silver, gold, vip } = params;
  const updateBody = {
    cafe_info: { cafe_name, address, phone },
    discount_rate: { silver, gold, vip },
    owner_id,
    cafe_id: 12 /* 변경 필요 */,
  };
  const newCafe = await new CafeModel({ ...updateBody });
  // 카페 등록하면 db.users.user.member의 상태도 업데이트 해주어야 함
  await UserModel.findOneAndUpdate({ id: owner_id }, { $set: { member: 201 /* 아직 미정 */ } });
  // 메뉴판도 만들어 주어야 함
  const newMenu = await new MenuModel({ cafe_id: 12 /* 변경 필요 */ });
  newMenu.save();
  return newCafe.save();
};
