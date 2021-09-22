import { MenuModel } from '@db/menu/MenuModel';

export const FindMenuList = (cafe_id: number) => MenuModel.findOne({ cafe_id });
