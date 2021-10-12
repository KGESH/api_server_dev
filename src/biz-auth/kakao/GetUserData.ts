import fetch from 'node-fetch';
import { IMember } from '@db/member/MemberModel';

export const GetUserData = async (kakaoAccessToken: string): Promise<IMember> => {
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
      const member: IMember = {
        id,
        name: '이름',
        email,
      };
      return member;
    });
};
