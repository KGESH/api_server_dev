export const GetKakaoAuthCode = (req: any, res: any) => {
  const REST_KEY = 'a5425f765fe84a925039fada5e2cd80c';
  const redirect_uri = 'http://localhost:4010/auth/kakaoCallback';
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
  console.log(`from kakao`);
  console.log(res);

  //res.redirect(kakaoAuthURL);
};
