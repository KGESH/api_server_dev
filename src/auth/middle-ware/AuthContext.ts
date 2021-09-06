import { VerifyToken } from '@auth/Jwt';

/**
 * 인증 미들웨어
 * Client가 request 보낼때마다 가로채서 헤더에 인증 토큰이 있는지 검사
 */
export const AuthContext = ({ req }: any) => {
  console.log(`call AuthContext!`);
  if (req?.headers) {
    console.log('req headers');
    console.log(req.headers);
  }

  /**
   * Bearer Token From Client
   * `Bearer ${token}` 형태로 넘어옴
   */
  const authToken = req?.headers?.authorization?.split(' ')[1] ?? undefined;

  console.log(`authToken: ${authToken}`);
  if (!authToken) {
    console.log(`token undefined`);
    return { user: undefined };
  }
  const user = VerifyToken(authToken);
  console.log(`user is`);
  console.log(user);
  return {
    ...req,
    user,
  };
};
