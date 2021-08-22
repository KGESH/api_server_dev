import mongoose from 'mongoose';
import { UserModel } from '@db/user/UserModel';

export const CheckExistUserById = async (id: number) =>
  await UserModel.exists({ id });

export const CheckExistUserByEmail = async (email: string) =>
  await UserModel.exists({ email });

export const GetUserById = async (id: number) =>
  await UserModel.findOne({ id });

export const GetUserByEmail = async (email: string) =>
  await UserModel.findOne({ email });
