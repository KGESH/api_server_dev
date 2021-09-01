import { IMileage, MileageModel } from '@db/mileage/MileageModel';

export const SaveMileageLog = (mileageData: IMileage) => {
  const mileageLog = new MileageModel({ ...mileageData });
  return mileageLog.save();
};
