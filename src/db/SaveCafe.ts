import { CafeModel } from '@db/CafeModel';
import type { ICafe } from '@db/CafeModel';

export const SaveCafe = (cafe: ICafe) => {
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
