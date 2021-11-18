import { CafeModel } from '@db/cafe/CafeModel';

export interface ISaveStaff {
  cafe_id: number;
  staff_id: number;
  staff_name: string;
  staff_phone: string;
  staff_position: string;
}

export const SaveStaff = async (staffData: ISaveStaff) => {
  const { cafe_id, staff_id, staff_name, staff_phone, staff_position } = await staffData;
  const staff_data = { staff_id, staff_name, staff_phone, staff_position };
  if (await CafeModel.exists({ cafe_id })) {
    return CafeModel.findOneAndUpdate({ cafe_id }, { $push: { staff: { ...staff_data } } });
  } else {
    return { message: '카페가 존재하지 않습니다.' };
  }
};
