import { MileageModel } from '@db/mileage/MileageModel';
import { CafeModel } from '@db/cafe/CafeModel';

export const FindMileageLogByClientId = (client_id: number) => MileageModel.find({ client_id });

export const GetMileageByCafeId = (cafe_id: number) => CafeModel.find({ cafe_id });
export const GetMileageByOwnerId = (owner_id: number) => CafeModel.find({ owner_id });

export const GetMileageByDate = (start_date: string, end_date: string) => {
  const startSplit = start_date.split(/-| /);
  const endSplit = end_date.split(/-| /);
  const first: any = new Date(Number(startSplit[0]), Number(startSplit[1]), Number(startSplit[2]));
  const second: any = new Date(Number(endSplit[0]), Number(endSplit[1]), Number(endSplit[2]));
  return MileageModel.find({
    date: { $gte: first.toISOString(), $lte: second.toISOString() },
  });
};

export const GetMileageByDateAndCafeId = (
  cafe_id: number,
  start_date: string,
  end_date: string,
) => {
  const startSplit = start_date.split(/-| /);
  const endSplit = end_date.split(/-| /);
  const first: any = new Date(Number(startSplit[0]), Number(startSplit[1]), Number(startSplit[2]));
  const second: any = new Date(Number(endSplit[0]), Number(endSplit[1]), Number(endSplit[2]));
  return MileageModel.find({
    cafe_id,
    date: { $gte: first.toISOString(), $lte: second.toISOString() },
  });
};

export const GetMileageByDateAndOwnerId = (
  owner_id: number,
  start_date: string,
  end_date: string,
) => {
  const startSplit = start_date.split(/-| /);
  const endSplit = end_date.split(/-| /);
  const first: any = new Date(Number(startSplit[0]), Number(startSplit[1]), Number(startSplit[2]));
  const second: any = new Date(Number(endSplit[0]), Number(endSplit[1]), Number(endSplit[2]));
  return MileageModel.find({
    owner_id,
    date: { $gte: first.toISOString(), $lte: second.toISOString() },
  });
};
