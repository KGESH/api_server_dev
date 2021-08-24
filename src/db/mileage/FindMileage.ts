import { MileageModel } from '@db/mileage/MileageModel';

export const FindMileageLogByClientId = async (client_id: number) =>
  await MileageModel.find({ client_id });
