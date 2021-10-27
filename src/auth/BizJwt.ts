import JWT from 'jsonwebtoken';
import { jwtSecret } from '@auth/JwtConfig';
import { FindMemberById } from '@db/member/FindMember';
import { CreateToken } from '@auth/Jwt';

export const CreateBizToken = (biz: any) => {
  const { id, name, expireDate } = biz;
  // 변수 + 2달 1일 해주어야 함
  const expectedExpireDate = new Date();
  if (expireDate < expectedExpireDate) {
    // 날짜는 카카오에서 받아온 날짜를 대입
    const token = JWT.sign({ id, name }, jwtSecret, {
      expiresIn: '60d' /* 카카오에서 받아온 날짜 */,
      algorithm: 'HS256',
    });

    return token;
  } else {
    return { message: '비정상 접근' };
  }
};

export const CreateBizRefreshToken = (id: number) => {
  const token = JWT.sign({ id }, jwtSecret, {
    expiresIn: '60d' /* 카카오에서 받아온 날짜 */,
    algorithm: 'HS256',
  });
};

const VerifyBizToken = (token: string) => {
  JWT.verify(token, jwtSecret, (err: any, payload: any) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          // 만기 날짜 에러
          return { message: 'TokenExpiredError', payload: JWT.decode(token) };

        case 'JsonWebTokenError':
          // return 웹 토큰 에러
          return { message: 'JsonWebTokenError' };
      }
    }
    return { message: 'success', payload };
  });
};

export const VerifyBiz = async (token: string) => {
  try {
    const { payload }: any = await VerifyBizToken(token);
    const member: any = await FindMemberById(payload.id);
    return { member, token };
  } catch (e: any) {
    switch (e.message) {
      case 'TokenExpiredError':
        const member = await FindMemberById(e.payload.id);
        if (member?.refresh_token) {
          try {
            // token만 만료되었을 때
            await VerifyBizToken(member.refresh_token);
            const jwt = CreateToken(member);
            return { member, jwt };
          } catch (e) {
            // refreshToken도 만료 되었을 때
            return undefined;
          }
        }
      case 'JsonWebTokenError':
        return undefined;
    }
  }
};
