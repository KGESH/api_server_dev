import mongoose, { Schema } from 'mongoose';

export interface IAuthUser {
  user: IUser;
  jwt: string;
}
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
  refresh_token?: string;
  home_tag_list?: [string];
  map_tag_list?: [string];
}

const qrSchema = new Schema<IQR>({
  cafe_name: String!,
  code: String!,
  card_img: String!,
  visit_times: Number,
});

const userSchema = new Schema<IUser>({
  id: { type: Number, required: true, unique: true },
  name: String!,
  email: String!,
  auth: { type: String, default: 'client' },
  rating: { type: String, default: 'DefaultRating' },
  review_count: { type: Number, default: 0 },
  cafe_list: {
    type: [qrSchema],
    default: [
      { cafe_name: 'test_cafe_name', code: 'test_code', card_img: 'test_img_url', visit_times: 0 },
    ],
  },
  point: { type: Number, default: 0 },
  profile_img: { type: String, default: 'defaultThumbnail' },
  average_star: { type: Number, default: 0 },
  refresh_token: { type: String, default: '' },
  home_tag_list: { type: [String], default: ['팔로우', '내 주변', '공부하기 좋은', '테라스'] },
  map_tag_list: { type: [String], default: ['팔로우', '내 주변', '즐겨찾기', '테라스'] },
  member: { type: Number, default: 0 },
});

export const UserModel = mongoose.model('user', userSchema, 'users');
