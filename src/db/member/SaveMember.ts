import { IMember, MemberModel } from '@db/member/MemberModel';

export const SaveMember = ({ id, name, email }: IMember) => {
  const user = new MemberModel({ id, name, email });
  return user.save();
};

export const FindOrSaveMember = async (params: any) => {
  const member = await MemberModel.exists({ id: params.id });
  if (member) {
    return member;
  } else {
    const newMember = new MemberModel({ id: params.id });
    try {
      await newMember.save();
      return { member: 0 };
    } catch (err) {
      console.log(err);
      return { member: -1 };
    }
  }
};
