import fetch from 'node-fetch';
import { IUser } from '@db/user/UserModel';
export const GetUserData = async (kakaoAccessToken: string): Promise<IUser> => {
  const kakaoRequestUrl = 'https://kapi.kakao.com/v2/user/me';
  const formData = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  };

  return await fetch(kakaoRequestUrl, formData)
    .then((res) => res.json())
    .then((result) => {
      console.log(`from kakao data`);
      console.log(result);
      const { id, kakao_account } = result;
      const { email } = kakao_account;
      const { nickname } = kakao_account.profile;
      const user: IUser = {
        id,
        name: nickname,
        nickname,
        email,
      };
      return user;
    });
};
