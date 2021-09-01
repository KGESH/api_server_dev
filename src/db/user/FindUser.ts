import { UserModel } from '@db/user/UserModel';

/* 현재 사용중 */
export const FindAllUser = async () => await UserModel.find({});

export const FindUserById = async (id: any) =>
  await UserModel.findOne({ ...id });

export const ExistCafeNameInUser = async (id: number, cafe_name: string) =>
  await UserModel.findOne({ id })
    .where('cafe_list')
    .equals({ $elemMatch: { cafe_name } });

export const CheckExistUserById = async (id: number) =>
  await UserModel.exists({ id });

/* 사용하지 않는 함수 */
//
// export const CheckExistUserByEmail = async (email: string) =>
//   await UserModel.exists({ email });
