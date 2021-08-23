import mongoose from 'mongoose';
import { UserModel } from '@db/user/UserModel';

export const FindUserById = async (id: number) =>
  await UserModel.exists({ id });

export const FindUserByEmail = async (email: string) =>
  await UserModel.exists({ email });

export const FindUser_CafeList = async (args: any) => {
  return await UserModel.findOne({ id: args.id })
    .where('cafe_list')
    .equals({ $elemMatch: { cafe_name: args.cafe_name } });
};
