import { CafeModel } from '@db/CafeModel';
import type { Cafe } from '@db/CafeModel';

export const SaveCafe = (cafe: Cafe) => {
  const newCafe = new CafeModel(cafe);
  newCafe.save((err: any, cafe: any) => {
    if (err) {
      throw new Error(err);
    }
    console.log(
      `save cafe callback info uid: ${cafe.id} name: ${cafe.cafe_name} info: ${cafe.cafe_info}`,
    );
  });
};
