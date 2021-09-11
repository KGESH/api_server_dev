import { CafeModel } from '@db/cafe/CafeModel';
import { ISaveStaff } from '@db/cafe/SaveCafe';

export const ShiftStaff = async (staffData: ISaveStaff) => {
  // return await CafeModel.findOneAndUpdate(
  //   { cafe_id: staffData.cafe_id, staff: { $elemMatch: { staff_id: staffData.staff_id } } },
  //   {
  //     $set: {
  //       enroll: true,
  //     },
  //   },
  // );
  return await CafeModel.findOne({ cafe_id: staffData.cafe_id }).findOneAndUpdate(
    { staff: { $elemMatch: { staff_id: staffData.staff_id } } },
    { $set: { '$.enroll': true } },
  );
};
//
//
// const cafe = CafeModel.findOne({ cafe_id: staffData.cafe_id });
// return await cafe.updateMany(
//   {},
//   {
//     $pull: {
//       enroll_staff: {
//         staff_id: staffData.staff_id,
//       },
//     },
//     $push: {
//       curr_staff: {
//         staff_id: staffData.staff_id,
//         staff_name: staffData.staff_name,
//         staff_phone: staffData.staff_phone,
//         staff_position: staffData.staff_position,
//       },
//     },
//   },
// );
// }
// ;
