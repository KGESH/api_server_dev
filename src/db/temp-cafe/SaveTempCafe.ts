import { CafeModel, DummyModel } from '@db/cafe/CafeModel';
import { UserModel } from '@db/user/UserModel';
import { MenuModel } from '@db/menu/MenuModel';
import { MemberModel } from '@db/member/MemberModel';

export const SaveTempCafe = async (dummy: any) => {
  /** 구조를 바꿀 함수입니다.
   * new DummyModel에 들어갈 모든 데이터를 클라이언트(비즈니스 앱)에서 구조를 '미리' 가춰서
   * 서버로 쏴줄겁니다.
   * 그러므로 const newTempCafe = new DummyModel({...params}) 이 상태로 바로 저장이 가능하게끔
   * 작성을 해주세요.
   * */
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
  /** params = cafe_id, owner_id
   * const newBody = TempCafe.data; 에 오류가 존재할 수 있습니다.
   * TempCafe.delete() 라는 함수는 작동하는지 확인 못했습니다. 인터페이스로 생각하고 작성하였습니다.
   * */
  const { cafe_id, owner_id } = params;
  // TempCafe 콜렉션에서 등록 대기중인 카페(DOC)를 조회합니다.
  const TempCafe = await DummyModel.findOne({ cafe_id, owner_id });
  // 조회한 데이터를 newBody에 저장합니다.
  const newBody = TempCafe.data;
  // newBody(DOC)를 Cafes 콜렉션에 저장합니다.
  const newCafe = new CafeModel({ ...newBody });
  await newCafe.save();
  // 해당 회원의 회원 등급(정회원, 준회원, 연결회원)을 조정합니다.
  await MemberModel.findOneAndUpdate({ id: owner_id }, { $set: { member: newBody.member } });
  // 카페 콜렉션에 '새로운 카페'가 저장되었으므로 TempCafe 데이터는 삭제합니다.
  await TempCafe.delete();
  // 오류 처리를 해주세요.
};
