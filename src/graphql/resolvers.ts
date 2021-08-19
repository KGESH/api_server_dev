import { UserModel } from '@db/UserModel';
import { CafeModel } from '@db/CafeModel';
import { CheckExistUserByEmail } from '@db/FindUser';
import { FindCafeByName, FindCafeById } from '@db/FindCafe';
import { VerifyToken } from '@auth/Jwt';

export const resolvers = {
  Query: {
    /** db 유저 조회 테스트용 쿼리 */
    getAllUser: async (_: any, __: any) => {
      console.log(`query request`);
      return await UserModel.find({});
    },
    /** db 카페 조회 테스트용 쿼리 (21-8-13:지성현) */
    getAllCafe: async (_: any, __: any) => {
      console.log(`query req`);
      return await CafeModel.find({});
    },
    /** MyPage에서 사용할 사용자 조회 Query (21-8-12:유성현) */
    getUserById: async (_: any, args: any) => {
      return await UserModel.findOne({ id: args.id });
    },
    /** email로 db에서 유저 조회 */
    emailUser: async (_: any, { email }: any) => {
      return CheckExistUserByEmail(email);
    },
    /** MyPage Detail에서 사용할 카페 조회 Query (21-8-13:지성현) */
    getCafeByName: async (_: any, { name }: any) => {
      console.log(`call cafe name`);
      console.log(name);
      return await FindCafeByName(name);
    },
    getKakaoUserByJwt: async (_: any, { jwt }: any) => {
      console.log(`call jwt resolver`);
      console.log(jwt);
      const user = await VerifyToken(jwt);
      console.log(`kakao user result`);
      console.log(user);

      return user;
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
