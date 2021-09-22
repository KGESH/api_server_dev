import { CafeModel } from '@db/cafe/CafeModel';

export const FindAllCafe = () => CafeModel.find({});
// 에러 처리는 한번에 해결하도록 함
export const FindCafeByCafeId = (cafe_id: number) => CafeModel.findOne({ cafe_id });
export const FindCafeByOwnerId = (owner_id: number) => CafeModel.find({ owner_id });
