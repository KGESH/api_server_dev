import { DummyModel } from '@db/cafe/CafeModel';

export const DeleteTempCafe = (params: any) => {
  const { _id } = params;
  return DummyModel.findByIdAndDelete(_id);
};
