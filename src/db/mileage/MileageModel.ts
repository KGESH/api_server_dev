import mongoose, { Schema } from 'mongoose';
import { GetCurrentTime } from '@db/Time';

export interface IMileage {
  data: string;
  staff_id: number;
  client_id: number;
  cafe_name: string;
  menu_name: string;
  price: number;
  mileage: number;
  review: string;
  visit_times: number;
  cafe_id: number;
  owner_id: number;
}

const mileageSchema = new Schema<IMileage>({
  date: { type: Date, default: GetCurrentTime },
  staff_id: Number,
  client_id: Number,
  cafe_name: String,
  menu_name: [String],
  price: Number,
  mileage: Number,
  review: String,
  cafe_id: Number,
  owner_id: Number,
  visit_times: { type: Number, default: 1 },
});

export const MileageModel = mongoose.model('mileage', mileageSchema, 'mileage_log');
