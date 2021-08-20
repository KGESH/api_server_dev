import mongoose, { Schema } from 'mongoose';

export interface Iqr {
  cafeName: string;
  code: string;
}

const qrSchema = new Schema<Iqr>({
  cafeName: String,
  code: String,
});

export const qrModel = mongoose.model('qr_test_version', qrSchema, 'test-qr');
