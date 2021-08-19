import mongoose from 'mongoose';
import { UserModel } from '@db/UserModel';

/**
 * Check User: return promise<boolean>
 * Find User: return promise<user>
 * (21-8-14:지성현)
 */
export const CheckExistUserById = async (id: number) =>
  await UserModel.exists({ id });

export const CheckExistUserByEmail = async (email: string) =>
  await UserModel.exists({ email });

export const FindUserById = async (id: number) =>
  await UserModel.findOne({ id });

export const FindUserByEmail = async (email: string) =>
  await UserModel.findOne({ email });
