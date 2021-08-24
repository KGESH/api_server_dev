import { UserModel } from '@db/user/UserModel';

export const SaveCardToUser = async ({
  id,
  cafe_name,
  code,
  card_img,
}: any) => {
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
