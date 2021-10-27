import { IReview, ReviewModel, IPost, IStar } from '@db/review/ReviewModel';
import { IUser } from '@db/user/UserModel';

/**
 * 포스팅한 리뷰 DB에 저장
 * star 모델등 적용시켜야함
 * 수정 예정
 * (21-09-05:지성현)
 */
export const SaveReview = async (
  content: string,
  hash_tag_list: string[] | undefined,
  image_list: string[],
  user: IUser,
) => {
  const testStar: IStar = {
    flavor: 10,
    atmosphere: 10, // mood로 이름 변경 제안 (21-10-27:지성현)
    price: 10,
  };

  const newReview = new ReviewModel({
    review_id: user.id,
    user_name: user.name,
    content,
    location: 'jees home',
    /** cloud storage랑 연동후 작업예정 */
    star: testStar,
    image_list,
    hash_tag_list,
  });
  newReview.save((err: any, newReview: any) => {
    if (err) {
      throw new Error(err);
    }
    console.log(
      `save new review callback info owner: ${newReview.user_name} post_date: ${newReview.post_date} `,
    );
  });
  return true;
};
