import mongoose, { Schema } from 'mongoose';

const cafeSchema = new Schema({
  id: Number,
  cafe_name: String,
  cafe_info: String,
  bean_info: String,
  point_fluctuation: Number,
  discount_rate: Number,
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
