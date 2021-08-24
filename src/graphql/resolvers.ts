import { UserModel } from '@db/user/UserModel';
import { CafeModel } from '@db/cafe/CafeModel';
import { ExistCafeNameInUser, FindUserById } from '@db/user/FindUser';
import { SaveCardToUser } from '@db/user/FindAndUpdateUser';
import { VerifyToken } from '@auth/Jwt';
import { FindCafeByName } from '@db/cafe/FindCafe';
import { testFindReviewByKey } from '@db/review/FindReview';
import { FindMileageLogByClientId } from '@db/mileage/FindMileage';

export const resolvers = {
  Query: {
    /*
     *
     * 유저관련 Query [ Cntrl + F : 유저쿼리 ]
     *
     * */
    /** 유저 전체 조회 [params: none] */
    getAllUser: async (_: any, __: any) => {
      return await UserModel.find({});
    },
    /** 해당 id를 갖고있는 유저 조회 [params: id] (21-8-23:유성현) */
    getUserById: async (_: any, args: any) => {
      return await FindUserById(args);
    },
    /** 해당 user가 card를 갖고있는지 조회 [params: id, cafe_name] (21-8-23:유성현) */
    existCafeNameInUser: async (_: any, args: any) => {
      return await ExistCafeNameInUser(args);
    },
    /*
     *
     * 카페관련 Query [ Cntrl + F : 카페쿼리 ]
     *
     * */
    /** 카페 전체 조회 [params: none](21-8-13:지성현) */
    getAllCafe: async (_: any, __: any) => {
      return await CafeModel.find({});
    },
    /** 해당 name을 갖고있는 카페 조회 [params: name](21-8-23:유성현) */
    getCafeByName: async (_: any, args: any) => {
      return await FindCafeByName(args);
    },
    /*
     *
     * 리뷰, 게시물관련 Query [ Cntrl + F : 리뷰쿼리, 게시물쿼리 ]
     *
     * */
    /** test용 - 삭제 예정 */
    getReviewByKey: async (_: any, args: any) => {
      return await testFindReviewByKey(args);
    },
    /*
     *
     * 마일리지관련 Query [ Cntrl + F : 마일리지쿼리 ]
     *
     * */
    /** 해당 id를 보유한 유저의 마일리지Log를 조회 [args: client_id](21-8-24:유성현) */
    getMileageLogByClientId: async (_: any, args: any) => {
      return await FindMileageLogByClientId(args);
    },
  },
  Mutation: {
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
    /** 해당 id를 가지고있는 user에게 카드 발급 [params: id, cafe_name, code](21-08-20:유성현) */
    async saveCardToUser(_: any, args: any) {
      return await SaveCardToUser(args);
    },
  },
};
