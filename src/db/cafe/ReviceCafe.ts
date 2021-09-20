import { CafeModel } from '@db/cafe/CafeModel';
import { ISaveStaff } from '@db/cafe/SaveCafe';

// 직원 등록 메서드
export const ShiftStaff = async (staffData: ISaveStaff) => {
  const { cafe_id, staff_id } = staffData;
  console.log({ cafe_id });
  console.log({ staff_id });
  try {
    return await CafeModel.findOneAndUpdate(
      { cafe_id, 'staff.staff_id': staff_id },
      { $set: { 'staff.$.enroll': true } },
      { new: true },
    );
  } catch (e) {
    console.log(e);
  }
};

// cafe Document에 cafe_info 중 [카페] 이름, 위치, 카드img, 소개, 원두소개, 전화번호 모두를 수정할 수 있는 메서드
export const ReviseCafeData = async (cafe_info: any) => {
  try {
    const { cafe_id, cafe_name, position, card_img, introduction, beans, phone } = cafe_info;
    let updateBody: any = {};
    if (cafe_name && typeof cafe_name == 'string')
      updateBody = { 'cafe_info.cafe_name': cafe_name };
    else if (position && typeof position == 'string')
      updateBody = { 'cafe_info.position': position };
    else if (card_img && typeof card_img == 'string')
      updateBody = { 'cafe_info.card_img': card_img };
    else if (introduction && typeof introduction == 'string')
      updateBody = { 'cafe_info.introduction': introduction };
    else if (beans && typeof beans == 'string') updateBody = { 'cafe_info.beans': beans };
    else if (phone && typeof phone == 'string') updateBody = { 'cafe_info.phone': phone };
    else {
      console.log('한번에 하나의 item만 수정 가능함');
      return 'err';
    }
    return await CafeModel.findOneAndUpdate({ cafe_id }, updateBody, { new: true });
  } catch (err) {
    console.log(err);
    return { err };
  }
};
