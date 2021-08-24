import mongoose from 'mongoose';
import { UserModel } from '@db/user/UserModel';

export const CheckExistUserById = async (id: number) =>
  await UserModel.exists({ id });

export const CheckExistUserByEmail = async (email: string) =>
  await UserModel.exists({ email });

export const FindUserById = async (id: number) =>
  await UserModel.findOne({ id });

export const FindUserByEmail = async (email: string) =>
  await UserModel.findOne({ email });

/**
 * args 수정
 * (21-08-24:지성현)
 */
export const FindUser_CafeList = async ({ id, cafe_name }: any) => {
  return await UserModel.findOne({ id })
    .where('cafe_list')
    .equals({ $elemMatch: { cafe_name } });
};
