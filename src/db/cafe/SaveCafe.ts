import { CafeModel, ICafeStaff } from '@db/cafe/CafeModel';

export interface ISaveStaff {
  cafe_id: number;
  staff_id: number;
  staff_name: string;
  staff_phone: string;
  staff_position: string;
}

export const SaveStaff = async (staffData: ISaveStaff) => {
  return await CafeModel.findOneAndUpdate(
    { cafe_id: staffData.cafe_id },
    {
      $push: {
        staff: {
          staff_id: staffData.staff_id,
          staff_name: staffData.staff_name,
          staff_phone: staffData.staff_phone,
          staff_position: staffData.staff_position,
          /**
           * 나중에 수정할 때 ...staffData로 수정
           * */
        },
      },
    },
  );
};

// 사용하지 않음
// export const SaveCafe = (cafe: ICafe) => {
//   const newCafe = new CafeModel(cafe);
//   newCafe.save((err: any, cafe: any) => {
//     if (err) {
//       throw new Error(err);
//     }
//     console.log(
//       `save cafe callback info uid: ${cafe.cafe_id} name: ${cafe.cafe_name} info: ${cafe.cafe_info}`,
//     );
//   });
// };
