import { UserModel } from '@db/UserModel';
import { FindUserByEmail } from '@db/FindUser';
export const resolvers = {
  Query: {
    /**
     * db 유저 조회 테스트용 쿼리
     */
    getAllUser: async (_: any, __: any) => {
      console.log(`query request`);
      return await UserModel.find({});
    },
    /**
     * email로 db에서 유저 조회
     */
    emailUser: async (_: any, { email }: any) => {
      return FindUserByEmail(email);
    },
    /**
     * 인증 테스트용 쿼리
     * Client에서 인증 요청 보낼때
     * AuthContext 미들웨어에서 토큰을 검사
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     */
    authUser: (_: any, __: any, { user }: any) => {
      console.log(user);
      return user;
    },
  },
};
