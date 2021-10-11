import { CafeModel } from '@db/cafe/CafeModel';
import { ISaveStaff } from '@db/cafe/SaveCafe';

// 직원 등록 메서드
export const PermitStaff = (staffData: ISaveStaff) => {
  const { cafe_id, staff_id } = staffData;
  try {
    return CafeModel.findOneAndUpdate(
      { cafe_id, 'staff.staff_id': staff_id },
      { $set: { 'staff.$.enroll': true } },
    );
  } catch (err) {
    console.log(err);
  }
};

/** Name수정 제안: Revise -> Update */
// cafe Document에 cafe_info 중 [카페] 이름, 위치, 카드img, 소개, 원두소개, 전화번호 모두를 수정할 수 있는 메서드
export const UpdateCafeDesc = (cafe_info: any) => {
  const { cafe_id, cafe_name, location, card_img, introduction, beans, phone } = cafe_info;
  let updateBody: any = {};
  try {
    if (cafe_name && typeof cafe_name == 'string')
      updateBody = { 'cafe_info.cafe_name': cafe_name };
    else if (location && typeof location == 'string')
      updateBody = { 'cafe_info.location': location };
    else if (card_img && typeof card_img == 'string')
      updateBody = { 'cafe_info.card_img': card_img };
    else if (introduction && typeof introduction == 'string')
      updateBody = { 'cafe_info.introduction': introduction };
    else if (beans && typeof beans == 'string') updateBody = { 'cafe_info.beans': beans };
    else if (phone && typeof phone == 'string') updateBody = { 'cafe_info.phone': phone };
    else {
      return '에러처리';
    }
    return CafeModel.findOneAndUpdate({ cafe_id }, updateBody, { new: true });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const DeleteStaff = async (cafe_id: number, staff_id: number) => {
  try {
    return await CafeModel.findOneAndUpdate(
      { cafe_id },
      { $pull: { staff: { staff_id } } },
      { new: true },
    );
  } catch (err) {
    return '에러 처리';
  }
};
