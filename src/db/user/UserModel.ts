import mongoose, { Schema } from 'mongoose';

export interface IQR {
  cafe_name: string;
  code: string;
  card_img: string;
  visit_times: number;
}

export interface IUser {
  _id: string;
  id: number;
  name: string;
  email: string;
  auth: string;
  cafe_list: [IQR];
  point: number;
  average_star: number;
}

const QR_data = new Schema<IQR>({
  cafe_name: String,
  code: String,
  card_img: String,
  visit_times: Number,
});

const userSchema = new Schema<IUser>({
  _id: String,
  id: Number,
  name: String,
  email: String,
  auth: String,
  rating: String,
  cafe_list: [QR_data],
  point: Number,
  average_star: Number,
});

export const UserModel = mongoose.model('user', userSchema, 'users');
