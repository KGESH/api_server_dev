import { UserModel } from '@db/user/UserModel';

export const FindAllUser = async () => await UserModel.find({});

export const FindUserById = async (id: number) => await UserModel.findOne({ id });

export const FindUserByName = async (name: string) => await UserModel.findOne({ name });

export const ExistCafeNameInUser = async (id: number, cafe_name: string) =>
  await UserModel.findOne({ id }).where('cafe_list').equals({ $elemMatch: { cafe_name } });

export const CheckExistUserById = (id: number) => UserModel.exists({ id });
