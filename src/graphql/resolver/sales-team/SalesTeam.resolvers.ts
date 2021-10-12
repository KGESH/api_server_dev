import { PermitEnroll } from '@db/temp-cafe/SaveTempCafe';
import { DeleteTempCafe } from '@db/temp-cafe/UpdateTempCafe';
import { UpdateBizNotice } from '@db/business-manage/SaveBizManage';
import { IBizM } from '@db/business-manage/BizManageModel';
import { FindBizManage } from '@db/business-manage/FindBizManage';

export default {
  Query: {
    /** 영업팀에서 사용할 business 운영 데이터 (21-9-22:유성현) */
    getBizManage: () => FindBizManage(),
  },
  Mutation: {
    /** 사업자 앱 공지 수정 (21-9-22:유성현) */
    updateBizNotice: (_: any, params: IBizM) => UpdateBizNotice(params),
  },
};
