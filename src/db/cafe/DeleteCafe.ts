import { CafeModel } from '@db/cafe/CafeModel';

export const DeleteCurrentStaff = async (cafe_id: number, staff_id: number) => {
  return await CafeModel.findOneAndUpdate(
    { cafe_id: cafe_id },
    {
      $pull: {
        curr_staff: { staff_id: staff_id },
      },
    },
    { multi: false },
  );
};

export const DeleteEnrollStaff = async (cafe_id: number, staff_id: number) => {
  return await CafeModel.findOneAndUpdate(
    { cafe_id: cafe_id },
    {
      $pull: {
        enroll_staff: { staff_id: staff_id },
      },
    },
    { multi: false },
  );
};
