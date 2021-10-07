import { MemberModel } from '@db/member/MemberModel';

export const FindAllMembers = () => MemberModel.find({});

export const FindMemberById = (id: number) => MemberModel.findOne({ id });
