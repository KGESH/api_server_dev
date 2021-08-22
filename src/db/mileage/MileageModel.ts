import mongoose, { Schema } from 'mongoose';

export interface Mileage {
  id: number;
  date: number;
  cafe: string;
  menu: string;
  price: number;
  mileage: number;
  review: string;
}

const mileageSchema = new Schema<Mileage>({
  id: Number,
  date: Number,
  cafe: String,
  menu: String,
  price: Number,
  mileage: Number,
  review: String,
});

export const MileageModel = mongoose.model(
  'mileage',
  mileageSchema,
  'mileage-log',
);
