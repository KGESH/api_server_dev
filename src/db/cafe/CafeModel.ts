import mongoose, { Schema } from 'mongoose';

export interface ICafeInfo {
  name: string;
  beans: string;
  position: string;
  address: string;
  phone: string;
  card_img: string;
}

export interface IDiscountRate {
  silver: number;
  gold: number;
  vip: number;
}

export interface ICafe {
  id: number;
  cafe_info: ICafeInfo;
  discount_rate: IDiscountRate;
  owner_id: string;
  point_fluc: number;
}

const cafeInfoSchema = new Schema<ICafeInfo>({
  name: String,
  beans: String,
  position: String,
  address: String,
  phone: String,
  card_img: String,
});

const discountRateSchema = new Schema<IDiscountRate>({
  silver: Number,
  gold: Number,
  vip: Number,
});
const cafeSchema = new Schema<ICafe>({
  id: Number,
  cafe_info: cafeInfoSchema,
  discount_rate: discountRateSchema,
  owner_id: String,
  point_fluc: Number,
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
