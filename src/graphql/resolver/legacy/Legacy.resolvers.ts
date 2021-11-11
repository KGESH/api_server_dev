import { ExistCafeNameInUser, FindAllUser, FindUserById, FindUserByName } from '@db/user/FindUser';
import { GraphQLUpload } from 'graphql-upload';
import { SaveCardToUser, UpdateReviewCount } from '@db/user/FindAndUpdateUser';
import { VerifyUser } from '@auth/Jwt';
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
import {
  FindAllHashTag,
  FindHashTagById,
  FindHashTagByName,
  FindHashTagOverCount,
} from '@db/hashtag/FindHashTag';
import { IHashTag } from '@src/db/hashtag/HashTagModel';

export default {
  Query: {
    /*
     *
     * 마일리지관련 Query [ Cntrl + F : 마일리지쿼리 ]
     *
     * */
    /** 마일리지 조회 함수 1.전체조회 2.카페조회 3.오너조회 4.날짜조회 5.카페&날짜조회 6.오너&날짜조회 (21-10-03:유성현) */
    getAllMileageLog: () => MileageModel.find({}),
    getMileageByCafeId: (_: any, { cafe_id }: any) => GetMileageByCafeId(cafe_id),
    getMileageByOwnerId: (_: any, { owner_id }: any) => GetMileageByOwnerId(owner_id),
    getMileageByDate: (_: any, { start_date, end_date }: any) =>
      GetMileageByDate(start_date, end_date),

    getMileageByDateAndCafeId: (_: any, { find_cafe_id, start_date, end_date }: any) =>
      GetMileageByDateAndCafeId(find_cafe_id, start_date, end_date),

    getMileageByDateAndOwnerId: (_: any, { find_owner_id, start_date, end_date }: any) =>
      GetMileageByDateAndOwnerId(find_owner_id, start_date, end_date),

    /** 해당 id를 보유한 유저의 마일리지Log를 조회 [args: client_id](21-8-24:유성현) */
    getMileageLogByClientId: (_: any, { client_id }: IMileage) =>
      FindMileageLogByClientId(client_id),
  },
  Mutation: {
    /** 마일리지Log 등록 (21-9-3:유성현) */
    saveMileage: (_: any, mileageData: IMileage) => SaveMileageLog(mileageData),
  },
};
