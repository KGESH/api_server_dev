import { IMember, MemberModel } from '@db/member/MemberModel';

export const SaveMember = ({ id, name, email }: IMember) => {
  const user = new MemberModel({ id, name, email });
  return user.save();
};

export const FindOrSaveMember = async (params: any) => {
  const memberId = params.id;
  const memberExists = await MemberModel.exists({ id: memberId });
  if (memberExists) {
    return MemberModel.findOne({ id: memberId });
  } else {
    const newMember = new MemberModel({ id: memberId });
    try {
      await newMember.save();
      return newMember;
    } catch (err) {
      console.log(err);
      return { member: -1 };
    }
  }
};
