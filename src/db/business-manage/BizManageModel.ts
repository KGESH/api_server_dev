import mongoose, { Schema } from 'mongoose';

export interface IBizM {
  _id: string;
  notice: string;
}

const bizManageSchema = new Schema({
  notice: String,
});

export const BizManageModel = mongoose.model('biz_manage', bizManageSchema, 'business_manage');
