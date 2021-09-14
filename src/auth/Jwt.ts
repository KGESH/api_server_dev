import JWT from 'jsonwebtoken';
import { jwtSecret } from '@auth/JwtConfig';
import { IUser, IAuthUser } from '@db/user/UserModel';
import { FindUserById } from '@db/user/FindUser';

interface ITokenVerifyResult {
  message: string;
  payload?: any;
}

export const CreateToken = (user: IUser): string => {
  const { id, name, email } = user;
  const token = JWT.sign(
    {
      /**
       * payload
       */
      id,
      name,
      email,
    },
    jwtSecret,
    {
      expiresIn: '15m',
      algorithm: 'HS256',
    },
  );

  return token;
};

export const CreateRefreshToken = (id: number): string => {
  console.log(`call create ref token`);
  const token = JWT.sign(
    {
      id,
    },
    jwtSecret,
    {
      expiresIn: '15d',
      algorithm: 'HS256',
    },
  );

  return token;
};

/** jwt로 user 검증
 * jwt가 유효 - user, jwt를 반환
 * jwt가 만료, refresh_token이 유효 - jwt를 새로 발급하고 user, jwt를 반환
 * jwt & refresh_token 만료 - 리졸버에서 로그인 처리 필요
 * (21-09-12:지성현)
 */
export const VerifyUser = async (jwt: string): Promise<IAuthUser | undefined> => {
  try {
    return await VerifyToken(jwt).then(async (result: ITokenVerifyResult) => {
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
            return VerifyToken(user.refresh_token)
              .then(() => {
                const jwt = CreateToken(user);
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
const VerifyToken = (token: string) => {
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
