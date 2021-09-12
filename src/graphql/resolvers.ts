import { ExistCafeNameInUser, FindAllUser, FindUserById } from '@db/user/FindUser';
import { GraphQLUpload } from 'graphql-upload';
import { SaveCardToUser } from '@db/user/FindAndUpdateUser';
import { VerifyToken } from '@auth/Jwt';
import { FindAllCafe, FindCafeByCafeId, FindCafeByOwnerId } from '@db/cafe/FindCafe';
import { testFindReviewByKey } from '@db/review/FindReview';
import { SaveReview } from '@db/review/SaveReview';
import { FindMileageLogByClientId } from '@db/mileage/FindMileage';
import { UploadReviewImage } from '../gcp/CloudStorage';
import { SaveMileageLog } from '@db/mileage/SaveMileage';
import { IMileage } from '@db/mileage/MileageModel';
import { ICafe } from '@db/cafe/CafeModel';
import { ISaveStaff, SaveStaff } from '@db/cafe/SaveCafe';
import { ReviseBeansDec, ReviseCafeIntro, ReviseCafePhone, ShiftStaff } from '@db/cafe/ReviceCafe';
import { DeleteCurrentStaff, DeleteEnrollStaff } from '@db/cafe/DeleteCafe';
import { IFile, IPost } from '@src/db/review/ReviewModel';

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
    getUserById: async (_: any, id: any) => {
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
  },
  Mutation: {
    /**
     * 처음 카카오 로그인 할때 호출되는 mutation
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     * (2021-08-20:지성현)
     */
    getKakaoUserByJwt: (_: any, { jwt }: any) => {
      return VerifyToken(jwt);
    },
    /**
     * 인증 mutation
     * Client에서 인증 요청 보낼때
     * AuthContext 미들웨어에서 토큰을 검사
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     */
    authUser: async (_: any, __: any, { user }: any) => {
      const data = await user;
      console.log(data);
      return await data;
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
    postReview: async (_: any, review: IPost, { user }: any) => {
      if (!user) {
        /** handle login fail */
        return;
      }
      const { id, review_count } = await user;
      const { content, hash_tag_list, files } = review;

      await Promise.all([...files.map((file: any) => UploadReviewImage(file, id, review_count))])
        .then((urlList) => {
          SaveReview(content, hash_tag_list, urlList, user);
        })
        .catch((e) => console.log(e));
    },

    /** test resolver, 삭제예정 (21-09-04:지성현) */
    uploadImage: async (_: any, review: IPost, { user }: any) => {
      if (!user) {
        /** handle login fail */
        return;
      }

      const { id, review_count } = await user;
      const { content, hash_tag_list, files } = review;

      await Promise.all([...files.map((file: any) => UploadReviewImage(file, id, review_count))])
        .then((urlList) => SaveReview(content, hash_tag_list, urlList, user))
        .catch((e) => console.log(e));

      return await files[0];
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
      return await DeleteCurrentStaff(cafe_id, staff_id);
    },
    /** 카페 정보 수정 (21-9-12:유성현) */
    reviseCafeIntro: async (_: any, { cafe_id, value }: any) => {
      return await ReviseCafeIntro(cafe_id, value);
    },
    reviseBeansInfo: async (_: any, { cafe_id, value }: any) => {
      return await ReviseBeansDec(cafe_id, value);
    },
    reviseCafePhone: async (_: any, { cafe_id, value }: any) => {
      return await ReviseCafePhone(cafe_id, value);
    },
  },
};
