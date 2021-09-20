import { UserModel } from '@db/user/UserModel';

/* 현재 사용중 */
export const FindAllUser = async () => await UserModel.find({});

/** 버그 수정 {...id} -> {id}로 수정
 * {...id}로 실행 시, 어떤 id가 들어가도 DB의 유저 컬렉션 최상단 도큐먼트만 가져옴
 * (21-09-11:지성현)
 */

export const FindUserById = async (id: number) => await UserModel.findOne({ id });
export const FindUserByName = async (name: string) => await UserModel.findOne({ name });

export const ExistCafeNameInUser = async (id: number, cafe_name: string) =>
  await UserModel.findOne({ id }).where('cafe_list').equals({ $elemMatch: { cafe_name } });

export const CheckExistUserById = async (id: number) => await UserModel.exists({ id });

/* 사용하지 않는 함수 */
// export const CheckExistUserByEmail = async (email: string) =>
//   await UserModel.exists({ email });
