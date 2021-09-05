import mongoose, { Schema } from 'mongoose';

export interface IQR {
  cafe_name: string;
  code: string;
  visit_times: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  auth?: string;
  cafe_list?: [IQR];
  rating?: string;
  review_count?: number;
  point?: number;
  profile_img?: string;
  average_star?: number;
}

const qrSchema = new Schema<IQR>({
  cafe_name: String!,
  code: String!,
  card_img: String!,
  visit_times: Number,
});

const userSchema = new Schema<IUser>({
  id: Number!,
  name: String!,
  email: String!,
  auth: { type: String, default: 'client' },
  rating: { type: String, default: 'DefaultRating' },
  review_count: { type: Number, default: 0 },
  cafe_list: { type: [qrSchema], default: [] },
  point: { type: Number, default: 0 },
  profile_img: { type: String, default: 'defaultThumbnail' },
  average_star: { type: Number, default: 0 },
});

export const UserModel = mongoose.model('user', userSchema, 'users');
