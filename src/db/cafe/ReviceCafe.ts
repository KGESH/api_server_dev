import { CafeModel } from '@db/cafe/CafeModel';
import { ISaveStaff } from '@db/cafe/SaveCafe';

// 직원 등록 메서드
export const ShiftStaff = async (staffData: ISaveStaff) => {
  return await CafeModel.findOneAndUpdate(
    { cafe_id: staffData.cafe_id, 'staff.staff_id': staffData.staff_id },
    { $set: { 'staff.$.enroll': true } },
    { new: true },
  );
};

// cafe_info 내부 데이터 수정 메서드
export const ReviseCafeData = async (params: any) => {
  try {
    const { cafe_id, introduction, beans, phone } = params;
    const updateBody: any = {};
    // if (introduction) updateBody = { 'cafe_info.introduction': introduction };
    // 미해결된 코드
    if (introduction) updateBody.introduction = introduction;
    if (beans) updateBody.beans = beans;
    if (phone) updateBody.phone = phone;
    console.log({ updateBody });
    return await CafeModel.findOneAndUpdate({ cafe_id }, { $set: updateBody }, { new: true });
  } catch (err) {
    console.log(err);
    return { err };
  }
};
