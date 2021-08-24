import { UserModel } from '@db/user/UserModel';

/**
 * args 수정
 * (21-08-24:지성현)
 */
export const FindUser_InsertCard = async ({
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
