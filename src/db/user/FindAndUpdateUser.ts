import { UserModel } from '@db/user/UserModel';

export const FindUser_InsertCard = async (args: any) => {
  return await UserModel.findOneAndUpdate(
    { id: args.id },
    {
      $push: {
        cafe_list: {
          cafe_name: args.cafe_name,
          code: args.code,
        },
      },
    },
  );
};
