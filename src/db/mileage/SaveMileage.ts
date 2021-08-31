import { IMileage, MileageModel } from '@db/mileage/MileageModel';
import { GetCurrentTime } from '@db/Time';

export const SaveMileageLog = (mileageData: any) => {
  const mileageLog = new MileageModel({
    staff_id: mileageData.staff_id,
    client_id: mileageData.client_id,
    cafe_name: mileageData.cafe_name,
    menu_name: mileageData.menu_name,
    price: mileageData.price,
    mileage: mileageData.mileage,
  });
  mileageLog.save();
};
