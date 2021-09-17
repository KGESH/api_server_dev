import { DummyModel } from '@db/cafe/CafeModel';

export const DeleteTempCafe = (_id: any) => {
  return DummyModel.deleteOne({ _id });
};
