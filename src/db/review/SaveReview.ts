import { IReview, ReviewModel } from '@db/review/ReviewModel';

export const SaveReview = async (review: IReview) => {
  const newReview = new ReviewModel(review);
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
