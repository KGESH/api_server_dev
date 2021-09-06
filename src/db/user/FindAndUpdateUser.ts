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
