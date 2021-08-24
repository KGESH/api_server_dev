import { CafeModel } from '@db/cafe/CafeModel';
import type { ICafe } from '@db/cafe/CafeModel';

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
