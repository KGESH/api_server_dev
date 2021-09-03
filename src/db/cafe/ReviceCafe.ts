import { CafeModel } from '@db/cafe/CafeModel';
import { ISaveStaff } from '@db/cafe/SaveCafe';

export const ShiftStaff = async (cafe_id: number, staff_id: number) => {
  return CafeModel.findOneAndUpdate(
    // 작동 성공 & 에러 발생 CODE: (node:51035) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
    { cafe_id },
    {
      $pull: {
        enroll_staff: {
          staff_id: staff_id,
        },
      },
    },
  );
};
