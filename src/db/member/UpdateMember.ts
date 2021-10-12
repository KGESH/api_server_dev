import { MemberModel } from '@db/member/MemberModel';

export const UpdateRefreshTokenToMember = async (id: number, refresh_token: string) => {
  return await MemberModel.updateOne({ id }, { refresh_token });
};
export const DeleteRefreshTokenInMember = async (id: number) => {
  //return await UserModel.findOneAndDelete();
};
