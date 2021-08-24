import mongoose, { Schema } from 'mongoose';

export interface IComment {
  user_name: string;
  content: string;
  post_date: Date;
}

export interface IStar {
  flavor: number;
  atmosphere: number;
  price: number;
}

/** 필요하다고 생각해서 추가, 변경한 부분
 * 확인 후, 주석 지워주세요
 * (21-08-23:지성현)
 */
export interface IReview {
  key: string;
  user_name: string;
  content: string;
  location: string;
  star: IStar;
  image_list: [string];
  like_count: number;
  comment_list: [IComment];
  hash_tag_list: [string];
  liker_list: [string];
  post_date: Date;
}

const starSchema = new Schema({
  flavor: Number,
  atmosphere: Number,
  price: Number,
});

const commentSchema = new Schema({
  user_name: String,
  content: String,
  post_date: Date,
});

const reviewSchema = new Schema<IReview>({
  key: String,
  user_name: String!,
  content: String,
  location: String!,
  star: starSchema!,
  image_list: [String]!,
  like_count: { type: Number, default: 0 },
  comment_list: { type: [commentSchema], default: [] },
  hash_tag_list: { type: [String], default: [] },
  liker_list: { type: [String], default: [] },
  post_date: { type: Date, default: Date.now },
});

export const ReviewModel = mongoose.model('review', reviewSchema, 'review');
