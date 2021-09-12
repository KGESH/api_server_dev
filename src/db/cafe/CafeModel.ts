import mongoose, { Schema } from 'mongoose';

// 최종 수정 (21-9-3:유성현)

/**
 * 카페 인터페이스
 * */
export interface ICafeInfo {
  cafe_name: string;
  beans: string;
  position: string;
  address: string;
  phone: string;
  card_img: string;
  cafe_img: [string];
  like: number;
  introduction: string;
}

export interface IDiscountRate {
  silver: number;
  gold: number;
  vip: number;
}

export interface ICafeStaff {
  staff_id: number;
  staff_name: string;
  staff_phone: string;
  staff_position: string;
  enroll: boolean;
}

export interface ICafe {
  cafe_id: number;
  owner_id: number;
  cafe_info: ICafeInfo;
  discount_rate: IDiscountRate;
  point_fluc: number;
  staff: [ICafeStaff];
}

/**
 * 카페 요소 스키마
 * */
const cafeInfoSchema = new Schema<ICafeInfo>({
  cafe_name: String!,
  beans: String,
  position: String,
  address: String!,
  phone: String,
  card_img: String,
  cafe_img: [String],
  like: { type: Number, default: 0 },
  introduction: String,
});

const discountRateSchema = new Schema<IDiscountRate>({
  silver: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  vip: { type: Number, default: 0 },
});

const staffSchema = new Schema({
  staff_id: Number!,
  staff_name: String!,
  staff_phone: String!,
  staff_position: String!,
  enroll: { type: Boolean, default: false },
});

/**
 * 카페 스키마
 * */
const cafeSchema = new Schema<ICafe>({
  cafe_id: Number!,
  owner_id: Number!,
  cafe_info: cafeInfoSchema!,
  discount_rate: discountRateSchema!,
  point_fluc: { type: Number, default: 0 },
  staff: [staffSchema],
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
