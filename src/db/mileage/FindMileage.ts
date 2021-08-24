import { MileageModel } from '@db/mileage/MileageModel';

export const FindMileageLogByClientId = async ({ client_id }: any) =>
  await MileageModel.find({ client_id });
