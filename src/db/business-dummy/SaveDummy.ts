import { DummyModel } from '@db/business-dummy/DummyModel';

export const InsertDummy = (dummy: any) => {
  console.log(dummy);
  try {
    const dumm = new DummyModel({ ...dummy });
    return dumm.save();
  } catch (err) {
    console.log(err);
  }
};
