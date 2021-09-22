import { CafeModel } from '@db/cafe/CafeModel';

export interface ISaveStaff {
  cafe_id: number;
  staff_id: number;
  staff_name: string;
  staff_phone: string;
  staff_position: string;
}

export const SaveStaff = (staffData: ISaveStaff) => {
  const { cafe_id, staff_id, staff_phone, staff_position } = staffData;
  const staff_data = { staff_id, staff_phone, staff_position };
  return CafeModel.findOneAndUpdate({ cafe_id }, { $push: { staff: { ...staff_data } } });
};
