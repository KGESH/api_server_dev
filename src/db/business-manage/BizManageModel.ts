import mongoose, { Schema } from 'mongoose';

const bizManageSchema = new Schema({
  notice: String,
});

export const BizManageModel = mongoose.model('biz_manage', bizManageSchema, 'business_manage');
