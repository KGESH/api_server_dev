import mongoose from 'mongoose';
import { UserModel } from '@db/UserModel';

export const FindUserById = async (id: number) =>
  await UserModel.exists({ id });

export const FindUserByEmail = async (email: string) =>
  await UserModel.exists({ email });
