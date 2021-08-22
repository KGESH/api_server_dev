import mongoose, { Schema } from 'mongoose';

export interface IComment {
  data: string;
  user_name: string;
  content: string;
}
export interface IStar {
  flavor: number;
  atmosphere: number;
  price: number;
}

export interface Review {
  _id: string;
  key: string;
  user_name: string;
  content: string;
  like: number;
  map: number;
  star: IStar;
  comment: [IComment];
  hash_tag: [string];
}

const Star = new Schema({
  flavor: Number,
  atmosphere: Number,
  price: Number,
});
const Comment = new Schema({
  data: String,
  user_name: String,
  content: String,
});

const reviewSchema = new Schema<Review>({
  _id: String,
  key: String,
  user_name: String,
  content: String,
  like: Number,
  map: Number,
  star: Star,
  comment: [Comment],
  hash_tag: [String],
});

export const ReviewModel = mongoose.model('review', reviewSchema, 'review');
