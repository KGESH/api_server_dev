import { UserModel } from '@db/user/UserModel';
import { CafeModel } from '@db/cafe/CafeModel';
import { FindUser_CafeList } from '@db/user/FindUser';
import { ReviewModel } from '@db/review/ReviewModel';
import { MileageModel } from '@db/mileage/MileageModel';
import { FindUser_InsertCard } from '@db/user/FindAndUpdateUser';
import { VerifyToken } from '@auth/Jwt';

export const resolvers = {
  Query: {
    /** 유저관련 Query [ Cntrl + F : 유저쿼리 ]
     *
     *
     *
     *
     *
     * */
    /** 모든 유저 조회 [params: none] */
    getAllUser: async (_: any, __: any) => {
      console.log(`query request`);
      return await UserModel.find({});
    },

    /** db 카페 조회 테스트용 쿼리 [params: none](21-8-13:지성현) */
    getAllCafe: async (_: any, __: any) => {
      console.log(`query req`);
      return await CafeModel.find({});
    },
    /** 해당 user가 card를 갖고있는지 조회 [params: id, cafe_name] (21-8-23:유성현) */
    async existCafeNameInMyDB(_: any, args: any) {
      return FindUser_CafeList(args);
    },
    /** 카페관련 Query [ Cntrl + F : 카페쿼리 ]
     *
     *
     *
     *
     *
     * */
    /** 해당 name를 갖고있는 카페 조회 [params: name](21-8-23:유성현) */
    async getCafeByName(_: any, { name }: any) {
      return await CafeModel.findOne({ 'cafe_info.name': name });
    },
    /** 리뷰, 게시물관련 Query [ Cntrl + F : 리뷰쿼리, 게시물쿼리 ]
     *
     *
     *
     *
     *
     * */
    /** 유성현. test하려고 만든거에요 UserModel에 review 참조변수 추가 후 삭제*/
    async getReviewByKey(_: any, args: any) {
      return await ReviewModel.find({ key: args.key });
    },
    /** 마일리지관련 Query [ Cntrl + F : 마일리지쿼리 ]
     *
     *
     *
     *
     *
     * */
    /** 유성현. test하려고 만든거에요 */
    async getMileageByClientId(_: any, { client_id }: any) {
      return await MileageModel.findOne({ client_id: client_id });
    },
  },
  Mutation: {
    /** 해당 id를 가지고있는 user에게 카드 발급 [params: id, cafe_name, code](21-08-20:유성현) */
    async addCard(_: any, args: any) {
      return FindUser_InsertCard(args);
    },
    /**
     * 처음 카카오 로그인 할때 호출되는 mutation
     * (2021-08-20:지성현)
     */
    getKakaoUserByJwt: async (_: any, { jwt }: any) => {
      const user = VerifyToken(jwt);
      console.log(`get kakao user by jwt resolver`);
      console.log(user);
      return await user;
    },
    /**
     * 인증 mutation
     * Client에서 인증 요청 보낼때
     * AuthContext 미들웨어에서 토큰을 검사
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     */
    authUser: async (_: any, __: any, { user }: any) => {
      console.log(user);
      return await user;
    },
  },
};
