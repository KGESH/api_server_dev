import mongoose, { Schema } from 'mongoose';

/**
 * 해쉬태그 인터페이스
 * */
export interface IHashTag {
  id: number;
  name: string;
  count: number;
}

/**
 * 해쉬태그 스키마
 * */
const hashTagSchema = new Schema<IHashTag>({
  id: Number!,
  name: String!,
  count: { type: Number, default: 0 },
});

export const HashTagModel = mongoose.model('hashtag', hashTagSchema, 'hashtags');
