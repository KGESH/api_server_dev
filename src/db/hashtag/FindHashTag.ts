import { HashTagModel } from '@db/hashtag/HashTagModel';

/** 모든 해쉬태그 조회 */
export const FindAllHashTag = async () => await HashTagModel.find({});

/** 해당 id를 가진 해쉬태그 조회 */
export const FindHashTagById = async (id: number) => await HashTagModel.findOne({ id });

/** 해당 name을 가진 해쉬태그 조회 */
export const FindHashTagByName = async (name: string) => await HashTagModel.findOne({ name });

/** 해당 count값 보다 큰 count값을 가진 해쉬태그 조회 */
export const FindHashTagOverCount = async (count: number) =>
  await HashTagModel.find({ count: { $gte: count } });
