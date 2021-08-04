import mongoose from 'mongoose';
import { UserModel } from '@db/UserModel';

export const FindUserById = async (id: number) => {
  return await UserModel.exists({ id });
};
