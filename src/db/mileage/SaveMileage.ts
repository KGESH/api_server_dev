import { IMileage, MileageModel } from '@db/mileage/MileageModel';

export const SaveMileageLog = (mileageData: IMileage) => {
  // const {staff_id, client_id, } = mileageData;
  const mileageLog = new MileageModel({ ...mileageData });
  return mileageLog.save();
};
