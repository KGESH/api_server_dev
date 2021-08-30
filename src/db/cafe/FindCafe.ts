import { CafeModel } from '@db/cafe/CafeModel';

/* 현재 사용중 */

export const GetAllCafe = async () => await CafeModel.find({});

export const FindCafeByName = async (cafe_name: string) =>
  await CafeModel.findOne({ 'cafe_info.cafe_name': cafe_name });

// 사용 하지 않음
// export const FindCafeById = async ({ cafe_id }: any) =>
//   await CafeModel.findOne({ cafe_id });
