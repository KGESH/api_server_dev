import { DummyModel } from '@db/cafe/CafeModel';

export const DeleteTempCafe = (args: any) => {
  return DummyModel.findByIdAndDelete(args._id);
};
