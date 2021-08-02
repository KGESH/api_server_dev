type kakaoProps = {
  kakaoAuthCode: string;
};

const resolvers = {
  Mutation: {
    async getKakaoToken(_: any, { kakaoAuthCode }: kakaoProps) {
      console.log(`call getToken`);
    },
  },
};

export default resolvers;
