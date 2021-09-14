import { UserModel } from '@db/user/UserModel';

export const SaveCardToUser = async (
  id: number,
  cafe_name: string,
  code: string,
  card_img: string,
) => {
  return await UserModel.findOneAndUpdate(
    { id },
    {
      $push: {
        cafe_list: {
          cafe_name,
          code,
          card_img,
        },
      },
    },
  );
};

export const UpdateReviewCount = async (id: number, review_count: number) => {
  return await UserModel.updateOne({ id }, { $inc: { review_count } });
};

export const UpdateRefreshToken = async (id: number, refresh_token: string) => {
  return await UserModel.updateOne({ id }, { refresh_token });
};
export const DeleteRefreshTokenInUser = async (id: number) => {
  //return await UserModel.findOneAndDelete();
};
