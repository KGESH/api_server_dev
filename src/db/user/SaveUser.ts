import { UserModel } from '@db/user/UserModel';
import type { IUser } from '@db/user/UserModel';

export const SaveUser = (user: IUser) => {
  const newUser = new UserModel(user);
  newUser.save((err: any, newUser: any) => {
    if (err) {
      throw new Error(err);
    }
    console.log(
      `save newUser callback info uid: ${newUser.id} name: ${newUser.name} email: ${newUser.email} profile_image: ${newUser.profile_img}`,
    );
  });
};
