import mongoose, { Schema } from 'mongoose';

// 최종 수정 (21-9-3:유성현)

/**
 * 카페 인터페이스
 * */
export interface ICafeInfo {
  _id: string;
  cafe_name: string;
  beans: string;
  location: string;
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
  beans: { type: String, default: '' },
  location: { type: String, default: '' },
  address: { type: String, default: '', required: true },
  address_detail: { type: String, default: '' },
  phone: { type: String, default: '' },
  card_img: String,
  cafe_img: [String],
  like: { type: Number, default: 0 },
  introduction: { type: String, default: '' },
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

const menuSchema = new Schema({
  menu_name: String,
  price: Number,
  beans: String,
});

const menuListSchema = new Schema({
  title: { type: [String] },
  menu: [menuSchema],
});

/**
 * 카페 스키마
 * */
const cafeSchema = new Schema<ICafe>({
  cafe_id: { type: Number, required: true, unique: true },
  owner_id: Number!,
  cafe_info: cafeInfoSchema!,
  discount_rate: discountRateSchema!,
  point_fluc: { type: Number, default: 0 },
  staff: [staffSchema],
  menu_list: [menuListSchema],
});

export const CafeModel = mongoose.model('cafe', cafeSchema, 'cafes');
export const DummyModel = mongoose.model('temp_cafe', cafeSchema, 'temp_cafes');
