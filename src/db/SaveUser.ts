import { UserModel } from '@db/UserModel';
import type { IUser } from '@db/UserModel';

/**
 * 사용자 신규 가입시
 * db에 저장될 필드, 초기값 설정
 */
export const SaveUser = ({ id, name, email }: IUser) => {
  const user = new UserModel({
    id,
    name,
    email,
    auth: 'client',
    point: 0,
  });
  user.save((err: any, user: any) => {
    if (err) {
      throw new Error(err);
    }
    console.log(
      `save user callback info uid: ${user.id} name: ${user.name} email: ${user.email}`,
    );
  });
};
