import mongoose, { Schema } from 'mongoose';

export interface ICafe_info {
  cafe_name: string;
  beans: string;
  position: string;
  address: string;
  phone: string;
  card_img: string;
}

export interface IDiscount_rate {
  silver: number;
  gold: number;
  vip: number;
}

export interface Cafe {
  id: number;
  cafe_info: ICafe_info;
  discount_rate: IDiscount_rate;
  owner_id: string;
  point_fluc: number;
}

const cafe_infoSchema = new Schema<ICafe_info>({
  name: String,
  beans: String,
  position: String,
  address: String,
  phone: String,
  card_img: String,
});
const discount_rateSchema = new Schema<IDiscount_rate>({
  silver: Number,
  gold: Number,
  vip: Number,
});
const cafeSchema = new Schema<Cafe>({
  id: Number,
  cafe_info: cafe_infoSchema,
  discount_rate: discount_rateSchema,
  owner_id: String,
  point_fluc: Number,
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
