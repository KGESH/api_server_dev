// 메뉴의 순서를 변경하는 메서드를 작성한다.

import { IMenu, MenuModel } from '@db/menu/MenuModel';

export const SaveMenu = async (params: IMenu) => {
  const { cafe_id, link, menu_name, beans, price } = await params;
  const menu_data = { link, menu_name, beans, price };
  return MenuModel.findOneAndUpdate({ cafe_id }, { $push: { menu: { ...menu_data } } });
};

export const SaveMenuTitle = async (params: IMenu) => {
  /** 카테고리를 추가하는 메서드 @@
   * title 은 배열 형식이다.
   * title 을 저장할 때 꼭! 모든 title이 포함된 값을 넣어주어야 한다.
   * 즉 exist ["COFFEE", "TEA"] 이고 "PIZZA"를 추가하려면
   * title = "PIZZA"가 아닌
   * title = ["COFFEE", "TEA", "PIZZA"] 형식으로 메서드를 사용해야 한다.
   * 만약 카탈로그의 순서를 변경시킬 경우 ["TEA", "COFFEE", "PIZZA"] 이런식으로 등록해주면 변경이 가능하다.
   *
   * 카탈로그의 이름을 변경할 경우 그 하위 각각의 menu에도 link가 변경되는 메서드를 작성해주어야 한다.
   * */
  const { cafe_id, title } = await params;
  return MenuModel.findOneAndUpdate({ cafe_id }, { $set: { title } });
};

export const DeleteMenu = (params: IMenu) => {
  const { cafe_id, _id } = params;
  return MenuModel.findOneAndUpdate({ cafe_id }, { $pull: { menu: { _id } } });
};

export const ReviseMenu = (params: IMenu) => {
  const { cafe_id, _id, link, menu_name, beans, price } = params;
  const updateBody: any = { link, menu_name, beans, price };
  return MenuModel.findOneAndUpdate(
    { cafe_id, 'menu._id': _id },
    { $set: { 'menu.$': { ...updateBody } } },
  );
};

export const ReviseCategory = async (params: any) => {
  // 수정해야 할 부분: multi 옵션을 설정했으나 해당하는 배열의 첫번째 값만 변경된다.
  const { cafe_id, title, newTitle } = params;
  // const menus = await MenuModel.findOne({ cafe_id });
  return MenuModel.findOneAndUpdate(
    { cafe_id, 'menu.link': title },
    { $set: { 'menu.$.link': newTitle } },
    { multi: true },
  );
  // return await menus.update({ title: title }, { $set: { 'title.$': newTitle } });
};

export const AddCategory = async (params: IMenu) => {
  const { cafe_id, title } = params;
  return MenuModel.findOneAndUpdate({ cafe_id }, { $push: { title } });
};

export const DeleteCategory = (params: IMenu) => {
  const { cafe_id, title } = params;
  return MenuModel.findOneAndUpdate({ cafe_id }, { $pull: { title: title } });
};
