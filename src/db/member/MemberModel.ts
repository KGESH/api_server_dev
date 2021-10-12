import mongoose, { Schema } from 'mongoose';

export interface IMember {
  id: number;
  name: string;
  email: string;
  refresh_token: string;
  member: number;
}

const memberSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: String!,
  email: String!,
  refresh_token: { type: String, default: '' },
  member: { type: Number, default: 0 },
});

export const MemberModel = mongoose.model('member', memberSchema, 'members');
