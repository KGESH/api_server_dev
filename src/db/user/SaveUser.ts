import { UserModel } from '@db/user/UserModel';
import type { User } from '@db/user/UserModel';

export const SaveUser = ({ id, name, email }: User) => {
  const user = new UserModel({ id, name, email });
  user.save((err: any, user: any) => {
    if (err) {
      throw new Error(err);
    }
    console.log(
      `save user callback info uid: ${user.id} name: ${user.name} email: ${user.email}`,
    );
  });
};
