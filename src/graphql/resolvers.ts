type kakaoProps = {
  kakaoAuthCode: string;
};

export const resolvers = {
  Mutation: {
    async getKakaoToken(_: any, { kakaoAuthCode }: kakaoProps) {
      console.log(`call getToken`);
    },
  },
};
