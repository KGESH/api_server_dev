import { MileageModel } from '@db/mileage/MileageModel';

export const FindMileageLogByClientId = (client_id: number) => MileageModel.find({ client_id });
