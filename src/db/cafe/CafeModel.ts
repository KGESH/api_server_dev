import mongoose, { Schema } from 'mongoose';

export interface Cafe {
  id: number;
  cafe_name: string;
  cafe_info: string;
  bean_info: string;
  point_fluctuation: number;
  discount_rate: number;
}

const cafeSchema = new Schema<Cafe>({
  id: Number,
  cafe_name: String,
  cafe_info: String,
  bean_info: String,
  point_fluctuation: Number,
  discount_rate: Number,
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
