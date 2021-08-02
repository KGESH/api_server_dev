import fetch from 'node-fetch';

export const KakaoAuth = async (code: string) => {
  const urlParams: any = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: 'a5425f765fe84a925039fada5e2cd80c',
    redirect_uri: 'http://localhost:4010/auth/kakao/KakaoCallback',
    code,
  });

  console.log(`in kakao auth`);
  return await fetch(`https://kauth.kakao.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: urlParams,
  });
};
