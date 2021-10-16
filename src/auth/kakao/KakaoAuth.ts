import fetch from 'node-fetch';

/**
 * 카카오 서버로부터 온 인증코드로 엑세스 토큰을 받음
 */
export const KakaoAuth = async (code: string) => {
  const urlParams: any = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: 'a5425f765fe84a925039fada5e2cd80c',
    redirect_uri: 'http://34.64.157.141:4010/auth/kakao/KakaoCallback',
    code,
  });

  return await fetch(`https://kauth.kakao.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: urlParams,
  });
};
