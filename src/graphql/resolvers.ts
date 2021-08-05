import { UserModel } from '@db/UserModel';

type kakaoProps = {
  kakaoAuthCode: string;
};

type user = {
  id: number;
  name: string;
  email: string;
};

export const resolvers = {
  Query: {
    async getAllUser() {
      return await UserModel.find({});
    },
  },
  Mutation: {
    async getKakaoToken(_: any, { kakaoAuthCode }: kakaoProps) {
      console.log(`call getToken`);
    },
  },
};
