import mongoose, { Schema } from 'mongoose';

export interface Iqr {
  cafe_name: string;
  code: string;
  visit_times: number;
}

const qrSchema = new Schema<Iqr>({
  cafe_name: String,
  code: String,
  visit_times: Number,
});

export const qrModel = mongoose.model('qr_test_version', qrSchema, 'test-qr');
