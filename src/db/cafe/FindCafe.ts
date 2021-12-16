import { CafeModel } from '@db/cafe/CafeModel';
import { isMember, isSalesTeam, isStaff } from '@db/member/MemberCheck';

export const FindAllCafe = () => CafeModel.find({});
// 에러 처리는 한번에 해결하도록 함
export const FindCafeByCafeId = (cafe_id: number) => CafeModel.findOne({ cafe_id });
export const FindCafeByOwnerId = (owner_id: number) => CafeModel.find({ owner_id });

export const FindCafeByCafeName = async ({ cafe_name }: any) => {
  const result = await CafeModel.find({ 'cafe_info.cafe_name': { $regex: cafe_name } });
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

export const FindStaff = async (params: any) => {
  if (isMember(params.member)) {
    // 사용자가 Member 이면 staff[] 를 내려준다.
    const staffList: any[] = [];
    const findCafe = await CafeModel.find({ cafe_id: params.cafe_id });
    for (const cafe of findCafe) {
      for (const staff of cafe.staff) {
        const staffDto = {
          staff_id: staff.staff_id,
          cafe_name: cafe.cafe_info.cafe_name,
          staff_name: staff.staff_name,
          cafe_id: cafe.cafe_id,
          staff_phone: staff.staff_phone,
          staff_position: staff.staff_position,
          enroll: staff.enroll,
        };
        staffList.push(staffDto);
      }
    }
    return staffList;
  } else if (isSalesTeam(params.member)) {
    // 사용자가 영업팀 이면 member[] 를 내려준다.
    const memberList: any[] = [];
    const findCafe = await CafeModel.find();
    for (const cafe of findCafe) {
      const memberDto = {
        staff_id: cafe.owner_id,
        cafe_name: cafe.cafe_info.cafe_name,
        staff_name: '홍길동',
        cafe_id: cafe.cafe_id,
        staff_phone: '010-2377-8477',
        staff_position: 'c-member',
        enroll: true,
      };
      memberList.push(memberDto);
    }
    return memberList;
  }
};
