import { IReview, ReviewModel, IPost } from '@db/review/ReviewModel';
import { IUser } from '@db/user/UserModel';

/** cloud storage랑 연동전까지 안돌아갑니다 (21-09-03:지성현) */
export const SaveReview = async (review: IPost, user: IUser) => {
  const { content, hash_tag_list, files } = review;

  const newReview = new ReviewModel({
    key: user.id,
    user_name: user.name,
    content,
    location: 'jees home',
    /** cloud storage랑 연동후 작업예정 */
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
