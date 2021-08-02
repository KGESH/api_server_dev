import { KakaoAuth } from '@auth/kakao/KakaoAuth';
import { GetUserData } from '@auth/kakao/GetUserData';

export const KakaoCallback = (req: any, res: any) => {
  const REDIRECT_URL = 'http://localhost:3000/Login/KakaoCallback';
  const { code, state } = req.query;
  let access_token, refresh_token;

  console.log('callback code is ');
  console.log(state);
  console.log(code);

  KakaoAuth(code)
    .then((res) => res.json())
    .then((result) => {
      console.log(`result is `);
      console.log(result);
      console.log(`kakao token isssss : ${result.access_token}`);

      access_token = result.access_token;
      refresh_token = result.refresh_token;

      console.log(`access token is ${access_token}`);
      console.log(`refresh token is ${refresh_token}`);

      GetUserData(access_token);

      return res.redirect(
        `${REDIRECT_URL}/?access_token=${access_token}&refresh_token=${refresh_token}`,
      );
    })
    .catch((err) => console.log(err));
};

export const KakaoTokenCallback = (req: any, res: any) => {
  const { access_token, expires_in, refresh_token, refresh_token_expires_in } =
    req.query;
  console.log(`token is `);
  console.log(access_token);

  return res.redirect(
    `http://localhost:3000/Login/KakaoCallback/?data=${access_token}`,
  );
};
