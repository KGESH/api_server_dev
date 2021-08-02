import fetch from 'node-fetch';

export const GetUserData = async (kakaoAccessToken: string) => {
  const kakaoRequestUrl = 'https://kapi.kakao.com/v2/user/me';
  const formData = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  };

  const result = await fetch(kakaoRequestUrl, formData)
    .then((res) => res.json())
    .then((result) => {
      console.log(`request me result`);
      console.log(result);
      return result;
    });
};
