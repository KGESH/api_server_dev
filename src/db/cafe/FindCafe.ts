import { CafeModel } from '@db/cafe/CafeModel';

/* 현재 사용중 */
export const FindAllCafe = async () => await CafeModel.find({});

export const FindCafeByCafeId = async (cafe_id: number) =>
  await CafeModel.findOne({ cafe_id });

// 사용 하지 않음
/*export const FindCafeByName = async (cafe_name: string) =>
  await CafeModel.findOne({ 'cafe_info.cafe_name': cafe_name });*/

/*export const FindCafeById = async ({ cafe_id }: any) =>
  await CafeModel.findOne({ cafe_id });*/
