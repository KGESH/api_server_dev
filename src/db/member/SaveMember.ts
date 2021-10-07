import { IMember, MemberModel } from '@db/member/MemberModel';

export const SaveMember = ({ id, name, email }: IMember) => {
  const user = new MemberModel({ id, name, email });
  return user.save();
};
