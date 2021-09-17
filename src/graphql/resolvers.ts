import { ExistCafeNameInUser, FindAllUser, FindUserById } from '@db/user/FindUser';
import { GraphQLUpload } from 'graphql-upload';
import { SaveCardToUser, UpdateReviewCount } from '@db/user/FindAndUpdateUser';
import { VerifyUser } from '@auth/Jwt';
import { FindAllCafe, FindCafeByCafeId, FindCafeByOwnerId } from '@db/cafe/FindCafe';
import { testFindReviewByKey } from '@db/review/FindReview';
import { SaveReview } from '@db/review/SaveReview';
import { FindMileageLogByClientId } from '@db/mileage/FindMileage';
import { UploadReviewImage } from '@gcp/CloudStorage';
import { SaveMileageLog } from '@db/mileage/SaveMileage';
import { IMileage } from '@db/mileage/MileageModel';
import { ICafe } from '@db/cafe/CafeModel';
import { ISaveStaff, SaveStaff } from '@db/cafe/SaveCafe';
import { ReviseCafeData, ShiftStaff } from '@db/cafe/ReviceCafe';
import { DeleteStaff } from '@db/cafe/DeleteCafe';
import {
  FindAllHashTag,
  FindHashTagById,
  FindHashTagByName,
  FindHashTagOverCount,
} from '@db/hashtag/FindHashTag';
import { IHashTag } from '@src/db/hashtag/HashTagModel';
import { InsertDummy, PermitEnroll } from '@db/business-dummy/SaveDummy';
import { FindDummyData } from '@db/business-dummy/FindDummy';
import { DeleteTempCafe } from '@db/business-dummy/DeleteDummy';

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
  /** File upload를 위한 스칼라
   * apollo server 2.x에 기본 탑재되었지만,
   * 3.x 부터 호환성 문제로 없어짐
   * 외부 모듈 graphql-upload에 의존
   * (21-09-04:지성현)
   */
  Upload: GraphQLUpload,

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
    /** 해당 cafe_id를 갖고있는 카페 조회 [params: cafe_id](수정21-9-3:유성현) */
    getCafeByCafeId: async (_: any, { cafe_id }: ICafe) => {
      return await FindCafeByCafeId(cafe_id);
    },
    getCafeByOwnerId: async (_: any, { owner_id }: any) => {
      return await FindCafeByOwnerId(owner_id);
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
    getDummyData: async () => {
      return await FindDummyData();
    },

    /**
     *
     * 해쉬 태그 관련 쿼리
     *
     */
    /** 모든 해쉬태그 조회 */
    getAllHashTag: async (_: any, __: any) => {
      return await FindAllHashTag();
    },
    /** 해당 id를 가진 해쉬태그 조회 */
    getHashTagById: async (_: any, { id }: IHashTag) => {
      return await FindHashTagById(id);
    },
    /** 해당 name을 가진 해쉬태그 조회 */
    getHashTagByName: async (_: any, { name }: IHashTag) => {
      return await FindHashTagByName(name);
    },
    /** 해당 count값 보다 큰 count값을 가진 해쉬태그 조회 */
    getHashTagOverCount: async (_: any, { count }: IHashTag) => {
      return await FindHashTagOverCount(count);
    },
  },
  Mutation: {
    /**
     * 처음 카카오 로그인 할때 호출되는 mutation
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     * (2021-08-20:지성현)
     */

    getKakaoUserByJwt: async (_: any, { jwt }: any) => {
      return await VerifyUser(jwt);
    },

    /**
     * 인증 mutation
     * Client에서 인증 요청 보낼때
     * AuthContext 미들웨어에서 토큰을 검사
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     */
    authUser: async (_: any, __: any, { authUser }: any) => {
      return await authUser;
    },

    /** 해당 id를 가지고있는 user에게 카드 발급 [params: id, cafe_name, code, card_img](21-08-20:유성현) */
    saveCardToUser: async (_: any, { id, cafe_name, code, card_img }: any) => {
      return await SaveCardToUser(id, cafe_name, code, card_img);
    },

    /**
     * 리뷰 작성 mutation
     * 추가 작업 예정
     * 아직 안돌아감
     * (21-09-05:지성현)
     */
    postReview: async (_: any, { review }: any, { authUser }: any) => {
      if (!authUser) {
        /** handle login fail */
        console.log(`user undefined`);
        return;
      }

      const { user } = await authUser;
      const { id, review_count } = await user;
      const { content, hash_tag_list, files } = await review;

      return await Promise.all([
        ...files.map((file: any) => UploadReviewImage(file, id, review_count)),
      ])
        .then((urlList) => {
          SaveReview(content, hash_tag_list, urlList, user);
          UpdateReviewCount(id, 1);
          return { success: true };
        })
        .catch((e) => {
          return {
            success: false,
            message: e,
          };
        });
    },

    /** 마일리지Log 등록 [params: 마일리지 스키마의 모든 데이터](21-9-3:유성현) */
    saveMileage: async (_: any, mileageData: IMileage) => {
      return await SaveMileageLog(mileageData);
    },
    /** 직원 등록 (21-9-4:유성현) */
    enrollStaff: async (_: any, staffData: ISaveStaff) => {
      return await SaveStaff(staffData);
    },
    shiftStaff: async (_: any, staffData: ISaveStaff) => {
      return await ShiftStaff(staffData);
    },
    deleteStaff: async (_: any, { cafe_id, staff_id }: any) => {
      return await DeleteStaff(cafe_id, staff_id);
    },
    /** 카페 정보 수정 (21-9-12:유성현) */
    reviseCafeDesc: async (_: any, cafe_info: any) => {
      return await ReviseCafeData(cafe_info);
    },
    /** 사업자 등록 (21-9-17:유성현) */
    saveBusinessDummy: async (_: any, dummy: any) => {
      return await InsertDummy(dummy);
    },
    /** 사업자 등록 승인 (21-9-17:유성현) */
    enrollCafe: async (_: any, params: any) => {
      return await PermitEnroll(params);
    },
    deleteTempCafe: async (_: any, { _id }: any) => {
      return await DeleteTempCafe(_id);
    },
  },
};
