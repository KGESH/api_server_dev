import { BizManageModel, IBizM } from '@db/business-manage/BizManageModel';

export const ReviseBizManage = (params: IBizM) => {
  const { _id, notice } = params;
  return BizManageModel.findByIdAndUpdate(_id, { $set: { notice } });
};
