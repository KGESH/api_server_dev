import mongoose, { Schema } from 'mongoose';

const mileageSchema = new Schema({
  id: Number,
  staff_id: String,
  client_id: String,
  cafe_name: String,
  menu_name: String,
  price: Number,
  mileage: String,
  review: String,
  visit_times: Number,
});

export const MileageModel = mongoose.model(
  'mileage',
  mileageSchema,
  'mileage-log',
);
