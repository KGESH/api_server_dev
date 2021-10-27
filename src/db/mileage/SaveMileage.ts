import { IMileage, MileageModel } from '@db/mileage/MileageModel';
import { CafeModel } from '@db/cafe/CafeModel';
import { UserModel } from '@db/user/UserModel';

export const SaveMileageLog = (mileageData: IMileage) => {
  // const {staff_id, client_id, } = mileageData;
  const mileageLog = new MileageModel({ ...mileageData });
  return mileageLog.save();
};

export const 마일리지_등록 = async (params: any) => {
  let saveRate = 0;
  let reserves = 0;
  // 마일리지 데이터( 사용자 nickname, id, price, 사업자 아이디, 카페 이름 ...)
  const { staff_id, client_id, price, nickname, cafe_id, cafe_name, menu_name } = params;
  // 사용자 등급에 해당하는 마일리지 적립율을 해당 카페에서 받아온 후
  const cafeData = await CafeModel.findOne({ cafe_id });
  console.log(cafeData.data);
  const saveRateData = cafeData.data.discount_rate;
  const userData = await UserModel.findOne({ id: client_id });
  console.log(userData.data);
  switch (userData.data.rating) {
    case 'silver':
      saveRate = saveRateData.silver;
      break;
    case 'gold':
      saveRate = saveRateData.gold;
      break;
    case 'vip':
      saveRate = saveRateData.vip;
      break;
  }

  // 적립금 = 메뉴 가격 * 적립율
  reserves = price * (saveRate / 100);

  // 마일리지Log를 등록하고
  const newMileageLog = new MileageModel({ ...params, mileage: reserves, date: new Date() });
  await newMileageLog.save();

  // 사용자에게 마일리지를 적립해준다.
  await userData.update({}, { $inc: { point: reserves } });
};
