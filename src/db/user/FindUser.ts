import { UserModel } from '@db/user/UserModel';

/* 현재 사용중 */
export const FindUserById = async ({ id }: any) =>
  await UserModel.findOne({ id });

export const ExistCafeNameInUser = async ({ id, cafe_name }: any) => {
  return await UserModel.findOne({ id })
    .where('cafe_list')
    .equals({ $elemMatch: { cafe_name } });
};

/* 사용하지 않는 함수 */
// export const CheckExistUserById = async ({ id }: any) =>
//   await UserModel.exists({ id });
//
// export const CheckExistUserByEmail = async ({ email }: any) =>
//   await UserModel.exists({ email });
