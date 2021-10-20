import fetch from 'node-fetch';
import { FRONT_WEB_RUL } from '@src/util/server-config/DeployConfig';
/**
 * 카카오 서버로부터 온 인증코드로 엑세스 토큰을 받음
 * gcp vm ip만 환경변수로 빼주는 작업 필요
 */
export const KakaoAuth = async (code: string) => {
  const urlParams: any = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: 'a5425f765fe84a925039fada5e2cd80c',
    redirect_uri: `${FRONT_WEB_RUL}/auth/kakao/KakaoCallback`,
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
