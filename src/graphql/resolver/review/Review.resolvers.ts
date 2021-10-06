import { SaveReview } from '@db/review/SaveReview';
import { UploadReviewImage } from '@gcp/CloudStorage';
import { UpdateReviewCount } from '@db/user/FindAndUpdateUser';

export default {
  Mutation: {
    postReview: async (_: any, { review }: any, { authUser }: any) => {
      if (!authUser) {
        /** handle login fail */
        console.log(`user undefined`);
        return;
      }

      const { user } = await authUser;
      const { id, review_count } = await user;
      const { content, hash_tag_list, files } = await review;

      return await Promise.all([
        ...files.map((file: any) => UploadReviewImage({ file, id, review_count })),
      ])
        .then((urlList) => {
          SaveReview(content, hash_tag_list, urlList, user);
          UpdateReviewCount(id, 1);
          return { success: true };
        })
        .catch((e) => {
          return {
            success: false,
            message: e,
          };
        });
    },
  },
};
