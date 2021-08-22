import mongoose, { Schema } from 'mongoose';

export interface QR_data {
  cafe_name: string;
  code: string;
  visit_times: number;
}

export interface User {
  _id: string;
  id: number;
  name: string;
  email: string;
  auth: string;
  cafe_list: [QR_data];
  point: number;
  average_star: number;
}

const QR_data = new Schema<QR_data>({
  cafe_name: String,
  code: String,
  visit_times: Number,
});

const userSchema = new Schema<User>({
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
