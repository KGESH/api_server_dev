import { CafeModel } from '@db/cafe/CafeModel';
import { ISaveStaff } from '@db/cafe/SaveCafe';

export const ShiftStaff = async (staffData: ISaveStaff) => {
  return await CafeModel.findOne({ cafe_id: staffData.cafe_id }).findOneAndUpdate(
    { staff: { $elemMatch: { staff_id: staffData.staff_id } } },
    { $set: { '$.enroll': true } },
  );
};

export const ReviseCafeIntro = async (cafe_id: number, value: string) => {
  return await CafeModel.findOneAndUpdate(
    { cafe_id },
    { $set: { 'cafe_info.introduction': value } },
  );
};

export const ReviseBeansDec = async (cafe_id: number, value: string) => {
  return await CafeModel.findOneAndUpdate({ cafe_id }, { $set: { 'cafe_info.beans': value } });
};

export const ReviseCafePhone = async (cafe_id: number, value: string) => {
  return await CafeModel.findOneAndUpdate({ cafe_id }, { $set: { 'cafe_info.phone': value } });
};
