import { CafeModel } from '@db/cafe/CafeModel';

export const FindAllCafe = () => CafeModel.find({});
// 에러 처리는 한번에 해결하도록 함
export const FindCafeByCafeId = (cafe_id: number) => CafeModel.findOne({ cafe_id });
export const FindCafeByOwnerId = (owner_id: number) => CafeModel.find({ owner_id });

export const FindCafeByCafeName = async ({ cafe_name }: any) => {
  const result = await CafeModel.find({ 'cafe_info.cafe_name': { $regex: cafe_name } });
  console.log('START -----------------------------');
  console.log(result);
  console.log('END -----------------------------');
  return result;
};

export const FindCafeByStaffId = (staff_id: number) =>
  CafeModel.find({ 'staff.staff_id': staff_id });

export const FindCafeByMemberId = ({ id, member }: any) => {
  if (isStaff(member)) {
    // 직원일 경우 일하고 있는 카페들을 내려준다.
    return CafeModel.find({ 'staff.staff_id': id });
  } else if (isMember(member)) {
    // 사업자일 경우 운영하고 있는 카페들을 내려준다.
    return CafeModel.find({ owner_id: id });
  } else if (isSalesTeam(member)) {
    // 영업팀의 경우 모든 카페 정보를 내려준다.
    return CafeModel.find({});
  }
};

const isStaff = (member: number) => {
  if (member > 100 && member < 200) return true;
  else return false;
};

const isMember = (member: number) => {
  if (member > 200 && member < 300) return true;
  else return false;
};

const isSalesTeam = (member: number) => {
  if (member === 900) return true;
  else return false;
};
