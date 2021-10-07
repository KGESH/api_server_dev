import { UserModel } from '@db/user/UserModel';

export const SaveCardToUser = (params: any) => {
  const { id, cafe_name, code, card_img } = params;
  const list = { cafe_name, code, card_img };
  return UserModel.findOneAndUpdate({ id }, { $push: { cafe_list: { ...list } } });
};

export const UpdateReviewCount = async (id: number, review_count: number) => {
  return await UserModel.updateOne({ id }, { $inc: { review_count } });
};

export const UpdateRefreshToken = async (id: number, refresh_token: string) => {
  return await UserModel.updateOne({ id }, { refresh_token });
};

export const UpdateProfile = async (id: number, nickname: string, imageUrl: string) => {
  return await UserModel.updateOne({ id }, { nickname, profile_img: imageUrl });
};

export const UpdateNickname = async (id: number, nickname: string) => {
  return await UserModel.updateOne({ id }, { nickname });
};

export const UpdateProfileImage = async (id: number, imageUrl: string) => {
  return await UserModel.updateOne({ id }, { profile_img: imageUrl });
};
