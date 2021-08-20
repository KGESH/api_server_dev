import jwt from 'jsonwebtoken';
import { jwtSecret } from '@auth/JwtConfig';
import { User } from '@db/user/UserModel';
import { FindUserById } from '@db/user/FindUser';

export const CreateToken = (user: User): string => {
  const { id, name, email } = user;
  const token = jwt.sign(
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
      expiresIn: '5m',
      algorithm: 'HS256',
    },
  );

  return token;
};

/**
 * token 검증
 */
export const VerifyToken = (token: string) =>
  jwt.verify(token, jwtSecret, (err: any, payload: any) => {
    console.log(`payload`);
    console.log(payload);
    if (err) {
      console.log(`token err!`);
      switch (err.name) {
        case 'TokenExpiredError':
          console.log(`TokenExpiredError!`);
          /**
           * JWT 재발급
           */
          return;
        case 'JsonWebTokenError':
          console.log(`JsonWebTokenError`);
          /**
           * Token 잘못 넘어왔을때 처리
           */
          return;
      }
    }
    const isExist = FindUserById(payload.id);
    const user: User = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };

    if (!isExist) {
      console.log(`new user`);
      /**
       * new user logic
       */
    }

    return user;
  });
