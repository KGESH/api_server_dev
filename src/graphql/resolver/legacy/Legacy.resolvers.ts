import { ExistCafeNameInUser, FindAllUser, FindUserById, FindUserByName } from '@db/user/FindUser';
import { GraphQLUpload } from 'graphql-upload';
import { SaveCardToUser, UpdateReviewCount } from '@db/user/FindAndUpdateUser';
import { VerifyUser } from '@auth/Jwt';
import { FindAllCafe, FindCafeByCafeId, FindCafeByOwnerId } from '@db/cafe/FindCafe';
import { SaveReview } from '@db/review/SaveReview';
import {
  FindMileageLogByClientId,
  GetMileageByCafeId,
  GetMileageByDate,
  GetMileageByDateAndCafeId,
  GetMileageByDateAndOwnerId,
  GetMileageByOwnerId,
} from '@db/mileage/FindMileage';
import { UploadReviewImage } from '@gcp/CloudStorage';
import { SaveMileageLog } from '@db/mileage/SaveMileage';
import { IMileage, MileageModel } from '@db/mileage/MileageModel';
import { ICafe } from '@db/cafe/CafeModel';
import { ISaveStaff, SaveStaff } from '@db/cafe/SaveCafe';
import { UpdateCafeDesc, PermitStaff } from '@db/cafe/UpdateCafe';
import { DeleteStaff } from '@db/cafe/UpdateCafe';
import {
  FindAllHashTag,
  FindHashTagById,
  FindHashTagByName,
  FindHashTagOverCount,
} from '@db/hashtag/FindHashTag';
import { IHashTag } from '@src/db/hashtag/HashTagModel';
import { SaveTempCafe, PermitEnroll } from '@db/temp-cafe/SaveDummy';
import { FindDummyData } from '@db/temp-cafe/FindDummy';
import { DeleteTempCafe } from '@db/temp-cafe/DeleteDummy';
import { FindBizManage } from '@db/business-manage/FindBizManage';
import { UpdateBizNotice } from '@db/business-manage/SaveBizManage';
import { FindMenuList } from '@db/menu/FindMenu';
import { SaveMenu, DeleteMenu, UpdateMenu, AddCategory, DeleteCategory } from '@db/menu/UpdateMenu';
import { IMenu } from '@db/menu/MenuModel';
import { IBizM } from '@db/business-manage/BizManageModel';
import { UserModel } from '@db/user/UserModel';

export default {
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
    getAllUser: () => {
      console.log(`call get all user@`);
      return FindAllUser();
    },
    /** 해당 id를 갖고있는 유저 조회 [params: id] (21-8-23:유성현) */
    getUserById: (_: any, { id }: any) => FindUserById(id),
    /** 유저 이름으로 유저 조회 () */
    getUserByName: (_: any, { name }: any) => FindUserByName(name),
    /** 해당 user가 card를 갖고있는지 조회 [params: id, cafe_name] (21-8-23:유성현) */
    existCafeNameInUser: (_: any, { id, cafe_name }: any) => ExistCafeNameInUser(id, cafe_name),
    /*
     *
     * 카페관련 Query [ Cntrl + F : 카페쿼리 ]
     *
     * */
    /** 카페 전체 조회 [params: none](21-8-13:지성현) */
    getAllCafe: (_: any, __: any) => FindAllCafe(),
    /** 해당 cafe_id를 갖고있는 카페 조회 [params: cafe_id](수정21-9-3:유성현) */
    getCafeByCafeId: (_: any, { cafe_id }: ICafe) => FindCafeByCafeId(cafe_id),
    /** 오너 아이디를 이용한 카페 조회 (21-9-3:유성현) */
    getCafeByOwnerId: (_: any, { owner_id }: ICafe) => FindCafeByOwnerId(owner_id),
    /** 등록 대기중인 상태의 카페 정보 조회 (21-9-19:유성현) */
    getDummyData: () => FindDummyData(),
    /** 영업팀에서 사용할 business 운영 데이터 (21-9-22:유성현) */
    getBizManage: () => FindBizManage(),
    /** cafe_id를 이용해 해당 menu_list를 받아옴 (21-9-22:유성현) */
    getMenuByCafeId: (_: any, { cafe_id }: IMenu) => FindMenuList(cafe_id),

    /*
     *
     * 마일리지관련 Query [ Cntrl + F : 마일리지쿼리 ]
     *
     * */
    /** 마일리지 조회 함수 1.전체조회 2.카페조회 3.오너조회 4.날짜조회 5.카페&날짜조회 6.오너&날짜조회 (21-10-03:유성현) */
    getAllMileageLog: () => MileageModel.find({}),
    getMileageByCafeId: (_: any, { cafe_id }: any) => GetMileageByCafeId(cafe_id),
    getMileageByOwnerId: (_: any, { owner_id }: any) => GetMileageByOwnerId(owner_id),
    /** start_date & end_date => '2020-10-02' | '2020 10 02' */
    getMileageByDate: (_: any, { start_date, end_date }: any) =>
      GetMileageByDate(start_date, end_date),
    getMileageByDateAndCafeId: (_: any, { cafe_id, start_date, end_date }: any) =>
      GetMileageByDateAndCafeId(cafe_id, start_date, end_date),
    getMileageByDateAndOwnerId: (_: any, { owner_id, start_date, end_date }: any) =>
      GetMileageByDateAndOwnerId(owner_id, start_date, end_date),
    /** 해당 id를 보유한 유저의 마일리지Log를 조회 [args: client_id](21-8-24:유성현) */
    getMileageLogByClientId: (_: any, { client_id }: IMileage) =>
      FindMileageLogByClientId(client_id),
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
      console.log(`call kakao user jwt : ${jwt}`);
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

    /** 해당 id를 가지고있는 user에게 카드 발급 (21-08-20:유성현) */
    saveCardToUser: (_: any, params: any) => SaveCardToUser(params),

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
        ...files.map((file: any) => UploadReviewImage({ file, id, review_count })),
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

    /** 마이페이지 프로필 업데이트 */
    editProfile: async (_: any, { profile }: any) => {
      console.log(`edit profile!`);
      const { nickname, file } = await profile;
      const { filename } = await file;
      console.log(file);
      console.log(`file name : ${filename}`);

      return await true;
    },

    /** 마일리지Log 등록 (21-9-3:유성현) */
    saveMileage: (_: any, mileageData: IMileage) => SaveMileageLog(mileageData),

    /** 직원 초기 등록/승인/삭제 (21-9-10:유성현) */
    saveStaff: (_: any, staffData: ISaveStaff) => SaveStaff(staffData),
    permitStaff: (_: any, staffData: ISaveStaff) => PermitStaff(staffData),
    deleteStaff: (_: any, { cafe_id, staff_id }: any) => DeleteStaff(cafe_id, staff_id),
    /** 카페 정보 수정 (21-9-12:유성현) */
    updateCafeDesc: (_: any, cafe_info: any) => UpdateCafeDesc(cafe_info),
    /** 사업자 초기 등록/승인/취소&삭제 (21-9-17:유성현) */
    saveTempCafe: (_: any, dummy: any) => SaveTempCafe(dummy),
    enrollCafe: (_: any, params: any) => PermitEnroll(params),
    deleteTempCafe: (_: any, params: any) => DeleteTempCafe(params),
    /** 사업자 앱 공지 수정 (21-9-22:유성현) */
    updateBizNotice: (_: any, params: IBizM) => UpdateBizNotice(params),
    /** 메뉴 추가/삭제/수정 (21-9-24:유성현) */
    saveMenu: (_: any, params: IMenu) => SaveMenu(params),
    deleteMenu: (_: any, params: IMenu) => DeleteMenu(params),
    updateMenu: (_: any, params: IMenu) => UpdateMenu(params),
    /** 메뉴 카테고리 추가/삭제 (21-9-22:유성현) */
    addCategory: (_: any, params: IMenu) => AddCategory(params),
    deleteCategory: (_: any, params: IMenu) => DeleteCategory(params),
    getUserStateById: (_: any, { id }: any) => UserModel.findOne({ id }),
  },
};
