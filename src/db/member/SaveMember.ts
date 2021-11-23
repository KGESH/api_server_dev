import { IMember, MemberModel } from '@db/member/MemberModel';

export const LoginMember = async (params: any) => {
  const memberId: number = params.id;
  console.log({ memberId });

  // 존재 확인
  const memberExists = await MemberModel.exists({ id: memberId });

  if (memberExists) {
    // 이미 회원가입이 되어있으면
    return MemberModel.findOne({ id: memberId });
  } else {
    // 가입이 안되어있으면
    const newMember = new MemberModel({ id: memberId, name: '홍길동', email: 'abc@naver.com' });
    await newMember.save();
    return newMember;
  }
};
