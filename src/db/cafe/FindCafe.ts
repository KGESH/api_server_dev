import { CafeModel } from '@db/cafe/CafeModel';

export const FindAllCafe = () => CafeModel.find({});
// 에러 처리는 한번에 해결하도록 함
export const FindCafeByCafeId = (cafe_id: number) => CafeModel.findOne({ cafe_id });
export const FindCafeByOwnerId = (owner_id: number) => CafeModel.find({ owner_id });

export const FindCafeByCafeName = ({ cafe_name }: any) =>
  CafeModel.find({ 'cafe_info.cafe_name': { $regex: cafe_name } });

export const FindCafeByStaffId = (staff_id: number) =>
  CafeModel.find({ 'staff.staff_id': staff_id });
