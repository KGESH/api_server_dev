import {
  FindAllHashTag,
  FindHashTagById,
  FindHashTagByName,
  FindHashTagOverCount,
} from '@db/hashtag/FindHashTag';
import { IHashTag } from '@src/db/hashtag/HashTagModel';

export default {
  Query: {
    getAllHashTag: async (_: any, __: any) => {
      return await FindAllHashTag();
    },
    getHashTagById: async (_: any, { id }: IHashTag) => {
      return await FindHashTagById(id);
    },
    getHashTagByName: async (_: any, { name }: IHashTag) => {
      return await FindHashTagByName(name);
    },
    /** 해당 count값 보다 큰 count값을 가진 해쉬태그 조회 */
    getHashTagOverCount: async (_: any, { count }: IHashTag) => {
      return await FindHashTagOverCount(count);
    },
  },
};
