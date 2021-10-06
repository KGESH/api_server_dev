import { BizManageModel, IBizM } from '@db/business-manage/BizManageModel';

export const UpdateBizNotice = async (params: IBizM) => {
  const { _id, notice } = await params;
  return BizManageModel.findByIdAndUpdate(_id, { $set: { notice } });
};
