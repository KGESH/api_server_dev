import mongoose from 'mongoose';
import { ReviewModel } from '@db/review/ReviewModel';

/**
 * 인덱싱 어떻게 할까 고민중
 * (21-08-23:지성현)
 */

export const GetRecentReviewsByHashTags = async (tags: string[]) => {
  return await ReviewModel.find({ hash_tag_list: { $all: tags } })
    .limit(20) /** 가져올 최대 document */
    .sort({ post_date: -1 }); /** 오름차순 = 1, 내림차순 = -1 */
};
