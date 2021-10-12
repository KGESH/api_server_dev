import { CafeModel } from '@db/cafe/CafeModel';
import { MenuModel } from '@db/menu/MenuModel';

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
  // if (await CafeModel.exists({ cafe_id })) {
  return CafeModel.findOneAndUpdate({ cafe_id }, { $push: { staff: staff_data } }, { new: true });
  // } else {
  //   return { message: '카페가 존재하지 않습니다.' };
  // }
};

export const TestSaveCafe = async (params: any) => {
  const newCafe = new CafeModel(params);
  const newMenu = new MenuModel({ cafe_id: params.cafe_id });
  await newCafe.save();
  await newMenu.save();
};
