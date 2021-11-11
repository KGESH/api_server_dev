import { MileageModel } from '@db/mileage/MileageModel';
import { CafeModel } from '@db/cafe/CafeModel';

export const FindMileageLogByClientId = (client_id: number) => {
  console.log('start');
  MileageModel.find({ client_id });
};

export const GetMileageByCafeId = (cafe_id: number) => CafeModel.find({ cafe_id });
export const GetMileageByOwnerId = (owner_id: number) => CafeModel.find({ owner_id });

export const GetMileageByDate = (start_date: string, end_date: string) => {
  const first: Date = new Date(start_date);
  const sceond: Date = new Date(end_date);
  console.log(first);
  console.log(sceond);
  console.log('Date');
  return MileageModel.find({
    date: { $gte: first, $lte: sceond },
  }).limit(50);
};
export const GetMileageByDateAndCafeId = (
  find_cafe_id: number,
  start_date: string,
  end_date: string,
) => {
  const first: Date = new Date(start_date);
  const sceond: Date = new Date(end_date);
  console.log('cafe_id');
  return MileageModel.find({
    $and: [
      { date: { $gte: first, $lte: sceond } },
      { cafe_id: { $gte: find_cafe_id, $lte: find_cafe_id } },
    ],
  });
};
export const GetMileageByDateAndOwnerId = (
  find_owner_id: number,
  start_date: string,
  end_date: string,
) => {
  const first: Date = new Date(start_date);
  const sceond: Date = new Date(end_date);
  console.log('owner_id');
  return MileageModel.find({
    $and: [
      { date: { $gte: first, $lte: sceond } },
      { owner_id: { $gte: find_owner_id, $lte: find_owner_id } },
    ],
  });
};
