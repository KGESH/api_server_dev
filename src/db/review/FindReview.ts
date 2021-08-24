import { ReviewModel } from '@db/review/ReviewModel';

/**
 * 인덱싱 어떻게 할까 고민중
 * (21-08-23:지성현)
 */

export const GetRecentReviewsByHashTags = async (tags: string[]) =>
  await ReviewModel.find({ hash_tag_list: { $all: tags } })
    .limit(20) /** 가져올 최대 document */
    .sort({ post_date: -1 }); /** 오름차순 = 1, 내림차순 = -1 */

// mypage-detail-review에 임시로 출력할 test 데이터 (대체함수가 생성되면 삭제)
export const testFindReviewByKey = async ({ key }: any) =>
  await ReviewModel.findOne({ key });
