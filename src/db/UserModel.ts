import mongoose, { Schema } from 'mongoose';

export type User = {
  id: number;
  name: string;
  email: string;
};

const userSchema = new Schema<User>({
  id: Number,
  name: String,
  email: String,
});

export const UserModel = mongoose.model('user', userSchema);
