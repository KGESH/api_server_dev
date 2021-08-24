import { CafeModel } from '@db/cafe/CafeModel';

/**
 * 카페 이름으로 db에서 해당 카페 1개 찾음.
 * 카페가 1개면 상관없지만
 * 같은 이름의 카페가 있을 경우
 * 고민 필요
 * (21-8-13:지성현)
 * comment: 카페를 찾을 때 이름을 이용해 찾는것보다 id를 이용해 찾는 방식으로 변경할게여
 * (21-8-24:유성현)
 */

/* 현재 사용중 */
export const FindCafeByName = async (cafe_name: string) =>
  await CafeModel.findOne({ 'cafe_info.cafe_name': cafe_name });

// 사용 하지 않음
// export const FindCafeById = async ({ cafe_id }: any) =>
//   await CafeModel.findOne({ cafe_id });
