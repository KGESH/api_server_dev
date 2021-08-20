import { UserModel } from '@db/user/UserModel';
import { CafeModel } from '@db/cafe/CafeModel';
import { FindUserByEmail } from '@db/user/FindUser';
import { FindCafeByName, FindCafeById } from '@db/cafe/FindCafe';
import { Cafe } from '@db/cafe/CafeModel';
import { SaveCafe } from '@db/cafe/SaveCafe';
import { Iqr, qrModel } from '@db/user/testQRModel';

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
    async getQR(_: any, __: any) {
      return await qrModel.find({});
    },
  },
  Mutation: {
    /**
     * QR코드를 촬영하고 링크를 들어가면 카드정보가 db에 저장되는 mutation(test-version)
     * (2021-08-20:유성현)
     * */
    async addQR(_: any, { cafeName, code }: Iqr) {
      return await qrModel.create({ cafeName, code });
    },
  },
};
