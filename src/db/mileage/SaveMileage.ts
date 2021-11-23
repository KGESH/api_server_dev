import { IMileage, MileageModel } from '@db/mileage/MileageModel';

export const SaveMileageLog = (mileageData: IMileage) => {
  console.log({ mileageData });
  return mileageData;
};
