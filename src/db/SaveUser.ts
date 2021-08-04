import { UserModel } from '@db/UserModel';
import type { User } from '@db/UserModel';

export const SaveUser = ({ id, name, email }: User) => {
  console.log(`save user call uid: ${id} name: ${name} email: ${email}`);
  const user = new UserModel({ id, name, email });
  user.save((err: any, user: any) => {
    if (err) {
      return console.error(err);
    }
    console.log(
      `save user callback info uid: ${user.id} name: ${user.name} email: ${user.email}`,
    );
  });
};
