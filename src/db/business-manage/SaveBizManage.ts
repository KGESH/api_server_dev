import { BizManageModel } from '@db/business-manage/BizManageModel';

export const ReviseBizManage = (params: any) => {
  const { _id, notice } = params;
  return BizManageModel.findByIdAndUpdate(_id, { $set: { notice } });
};
