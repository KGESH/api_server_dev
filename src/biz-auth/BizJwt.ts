import JWT from 'jsonwebtoken';
import { jwtSecret } from '@auth/JwtConfig';
import { IUser, IAuthUser } from '@db/user/UserModel';
import { FindUserById } from '@db/user/FindUser';

interface ITokenVerifyResult {
  message: string;
  payload?: any;
}

// user 정보로 토큰 생성. (jwtSecret: 암호문)
export const BizCreateToken = (user: IUser): string => {
  // user = { id, name, email }
  return JWT.sign(user, jwtSecret, { expiresIn: '15m', algorithm: 'HS256' });
};

// id로 Refresh토큰 생성. (jwtSecret: 암호문)
export const BizCreateRefreshToken = (id: number): string => {
  return JWT.sign({ id }, jwtSecret, { expiresIn: '15d', algorithm: 'HS256' });
};

/** jwt로 user 검증
 * jwt가 유효 - user, jwt를 반환
 * jwt가 만료, refresh_token이 유효 - jwt를 새로 발급하고 user, jwt를 반환
 * jwt & refresh_token 만료 - 리졸버에서 로그인 처리 필요
 * (21-09-12:지성현)
 */
// 유저 검증 함수
export const BizVerifyUser = async (jwt: string): Promise<IAuthUser | undefined> => {
  try {
    return await BizVerifyToken(jwt).then(async (result: ITokenVerifyResult) => {
      const user: any = await FindUserById(result.payload.id);
      const authUser: IAuthUser = { user, jwt };
      return authUser;
    });
  } catch (e: any) {
    switch (e.message) {
      case 'TokenExpiredError':
        /** jwt만료, refresh_token 유효 */
        return await FindUserById(e.payload.id).then((user: any) => {
          if (user?.refresh_token) {
            return BizVerifyToken(user.refresh_token)
              .then(() => {
                const jwt = BizCreateToken(user);
                const authUser: IAuthUser = { user, jwt };
                return authUser;
              })
              .catch((e: ITokenVerifyResult) => {
                /** jwt & refresh_token 만료
                 * 리졸버에서 로그인 처리 필요
                 */
                console.log(e);
                return undefined;
              });
          }
          return undefined;
        });

      case 'JsonWebTokenError':
        return undefined;
    }
  }
};

/** token 검증 (21-09-12:지성현) */
const BizVerifyToken = (token: string) => {
  return new Promise<ITokenVerifyResult>((resolve, reject) => {
    JWT.verify(token, jwtSecret, (err: any, payload: any) => {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            reject({ message: 'TokenExpiredError', payload: JWT.decode(token) });
            break;

          case 'JsonWebTokenError':
            reject({ message: 'JsonWebTokenError' });
            break;
        }
      }
      resolve({ message: 'success', payload });
    });
  });
};
