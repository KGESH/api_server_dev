import { CafeModel } from '@db/cafe/CafeModel';

export const DeleteStaff = async (cafe_id: number, staff_id: number) => {
  try {
    return await CafeModel.findOneAndUpdate({ cafe_id }, { $pull: { staff: { staff_id } } });
  } catch (err) {
    return '에러 처리';
  }
};
