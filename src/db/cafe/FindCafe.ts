import { CafeModel } from '@db/cafe/CafeModel';

/**
 * 카페 이름으로 db에서 해당 카페 1개 찾음.
 * 카페가 1개면 상관없지만
 * 같은 이름의 카페가 있을 경우
 * 고민 필요
 * (21-8-13:지성현)
 */
export const FindCafeByName = async (cafe_name: string) =>
  await CafeModel.findOne({ cafe_name });

export const FindCafeById = async (id: number) =>
  await CafeModel.findOne({ id });
