import { UserModel } from '@db/user/UserModel';
import type { IUser } from '@db/user/UserModel';

export const SaveUser = async ({ id, name, email, nickname }: IUser) => {
  const user = new UserModel({ id, name, email, nickname });
  await user.save();
};
