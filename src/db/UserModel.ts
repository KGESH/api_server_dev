import mongoose, { Schema } from 'mongoose';

export type User = {
  id: number;
  name: string;
  email: string;
  auth: string;
  qr_list: [string];
  point: number;
};

const userSchema = new Schema<User>({
  id: Number,
  name: String,
  email: String,
  auth: String,
  qr_list: [String],
  point: Number,
});

export const UserModel = mongoose.model('user', userSchema, 'users');
