import mongoose, { Schema } from 'mongoose';

export interface ICafeInfo {
  cafe_name: string;
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
  cafe_id: number;
  owner_id: number;
  cafe_info: ICafeInfo;
  discount_rate: IDiscountRate;
  point_fluc: number;
}

const cafeInfoSchema = new Schema<ICafeInfo>({
  cafe_name: String!,
  beans: String,
  position: String,
  address: String!,
  phone: String!,
  card_img: String!,
});

const discountRateSchema = new Schema<IDiscountRate>({
  silver: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  vip: { type: Number, default: 0 },
});

const cafeSchema = new Schema<ICafe>({
  cafe_id: Number!,
  owner_id: Number!,
  cafe_info: cafeInfoSchema!,
  discount_rate: discountRateSchema!,
  point_fluc: { type: Number, default: 0 },
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
