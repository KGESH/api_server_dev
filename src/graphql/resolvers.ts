import {
  ExistCafeNameInUser,
  FindAllUser,
  FindUserById,
} from '@db/user/FindUser';
import { SaveCardToUser } from '@db/user/FindAndUpdateUser';
import { VerifyToken } from '@auth/Jwt';
import { FindAllCafe, FindCafeByName } from '@db/cafe/FindCafe';
import { testFindReviewByKey } from '@db/review/FindReview';
import { FindMileageLogByClientId } from '@db/mileage/FindMileage';

/**
 * Resolver 2번째 인자 args 제거하고
 * 스키마에 정의된 데이터 형식 그대로 분해해서
 * 사용하는게 좋아보여서 수정합니다.
 * 지금 초기 단계라 스키마가 자주 바뀌어서 불편할 수 있겠지만
 * 이렇게 해야 타입 안정성이 높아져서 좋아보입니다.
 * 확인후 주석 제거 바랍니다.
 * (21-08-24:지성현)
 */
export const resolvers = {
  Query: {
    /*
     *
     * 유저관련 Query [ Cntrl + F : 유저쿼리 ]
     *
     * */
    /** 유저 전체 조회 [params: none] */
    getAllUser: async (_: any, __: any) => {
      return await FindAllUser();
    },
    /** 해당 id를 갖고있는 유저 조회 [params: id] (21-8-23:유성현) */
    getUserById: async (_: any, { id }: any) => {
      return await FindUserById(id);
    },
    /** 해당 user가 card를 갖고있는지 조회 [params: id, cafe_name] (21-8-23:유성현) */
    existCafeNameInUser: async (_: any, { id, cafe_name }: any) => {
      return await ExistCafeNameInUser(id, cafe_name);
    },
    /*
     *
     * 카페관련 Query [ Cntrl + F : 카페쿼리 ]
     *
     * */
    /** 카페 전체 조회 [params: none](21-8-13:지성현) */
    getAllCafe: async (_: any, __: any) => {
      return await FindAllCafe();
    },
    /** 해당 name을 갖고있는 카페 조회 [params: name](21-8-23:유성현) */
    getCafeByName: async (_: any, { cafe_name }: any) => {
      return await FindCafeByName(cafe_name);
    },
    /*
     *
     * 리뷰, 게시물관련 Query [ Cntrl + F : 리뷰쿼리, 게시물쿼리 ]
     *
     * */
    /** test용 - 삭제 예정 (21-8-23:유성현) */
    getReviewByKey: async (_: any, { key }: any) => {
      return await testFindReviewByKey(key);
    },
    /*
     *
     * 마일리지관련 Query [ Cntrl + F : 마일리지쿼리 ]
     *
     * */
    /** 해당 id를 보유한 유저의 마일리지Log를 조회 [args: client_id](21-8-24:유성현) */
    getMileageLogByClientId: async (_: any, { client_id }: any) => {
      return await FindMileageLogByClientId(client_id);
    },
  },
  Mutation: {
    /**
     * 처음 카카오 로그인 할때 호출되는 mutation
     * (2021-08-20:지성현)
     */
    getKakaoUserByJwt: (_: any, { jwt }: any) => {
      const user = VerifyToken(jwt);
      console.log(`get kakao user by jwt resolver`);
      return user;
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
    /** 해당 id를 가지고있는 user에게 카드 발급 [params: id, cafe_name, code, card_img](21-08-20:유성현) */
    async saveCardToUser(_: any, { id, cafe_name, code, card_img }: any) {
      return await SaveCardToUser(id, cafe_name, code, card_img);
    },
  },
};
