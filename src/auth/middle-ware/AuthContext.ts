import { VerifyUser } from '@auth/Jwt';

/**
 * 인증 미들웨어
 * Client가 request 보낼때마다 가로채서 헤더에 인증 토큰이 있는지 검사
 */
export const AuthContext = async ({ req }: any) => {
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
  const authUser = await VerifyUser(authToken);

  console.log(`middleware auth user`);
  console.log(authUser);

  return await {
    ...req,
    authUser,
  };
};
