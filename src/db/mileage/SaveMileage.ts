import { IMileage, MileageModel } from '@db/mileage/MileageModel';
import { GetCurrentTime } from '@db/Time';
import { UserModel } from '@db/user/UserModel';
import { CafeModel } from '@db/cafe/CafeModel';

const valueCheck = (savePercent: number, price: number, inputMileage: number) => {
  const predictMileage = (price * savePercent) / 100;
  if (predictMileage === inputMileage) {
    // 5000원 이상 적립 시 메시지 전송
    if (predictMileage > 5000) {
      const message = '마일리지 과다적립(적립 승인, 요청 금액:' + predictMileage + '원'; // 개발자, 영업팀에게 메시지 전송
      if (predictMileage > 20000) {
        throw { messge: '마일리지 과다적립(적립 취소, 요청 금액:' + predictMileage + '원' };
      }
    }
    return predictMileage;
  } else {
    const message = '비정상 접근'; // 개발자, 영업팀에게 메시지 전송
    throw { message: '가격 / 마일리지 미스매치' };
  }
};

export const SaveMileageLog = async (mileageData: IMileage) => {
  // 마일리지 등록 로직
  const findUser = await UserModel.findOne({ id: mileageData.client_id });
  const findCafe = await CafeModel.findOne({ cafe_id: 142019 });
  const userRating = findUser.rating;

  try {
    let mileage: number;
    switch (userRating) {
      case 'silver':
        mileage = valueCheck(findCafe.discount_rate.silver, mileageData.price, mileageData.mileage);
        break;
      case 'gold':
        mileage = valueCheck(findCafe.discount_rate.gold, mileageData.price, mileageData.mileage);
        break;
      case 'vip':
        mileage = valueCheck(findCafe.discount_rate.vip, mileageData.price, mileageData.mileage);
        break;
      default:
        console.log('user Rating ERROR =====================');
    }

    const newMileage = new MileageModel({
      date: new Date(),
      staff_id: mileageData.staff_id,
      client_id: mileageData.client_id,
      cafe_name: mileageData.cafe_name,
      menu_name: mileageData.menu_name,
      price: mileageData.price,
      mileage: mileage,
      cafe_id: 123321,
      owner_id: 123123,
      visit_times: 1,
    });
    newMileage.save();
  } catch (e) {
    console.log(e);
  }

  return mileageData;
};
