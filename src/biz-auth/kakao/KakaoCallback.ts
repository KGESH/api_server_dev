import { KakaoAuth } from '@auth/kakao/KakaoAuth';
import { GetUserData } from '@auth/kakao/GetUserData';
import { SaveUser } from '@db/user/SaveUser';
import { CheckExistUserById } from '@db/user/FindUser';
import { UpdateRefreshToken } from '@db/user/FindAndUpdateUser';
import { CreateRefreshToken, CreateToken } from '@auth/Jwt';
import { SaveMember } from '@db/member/SaveMember';
import { UpdateRefreshTokenToMember } from '@db/member/UpdateMember';

/**
 * Client가 카카오 로그인을 요청하고
 * 카카오 인증을 성공했을 때
 * 카카오 인증서버로부터 인증코드가 URL 쿼리에 담아져서 넘어옴
 * 해당 인증코드로 카카오 인증서버에게 Client의 정보에 접근가능한 Access_Token을 요청
 * 카카오 엑세스 토큰 발급에 성공하면 카카오 엑세스 토큰으로 Client의 정보 요청
 * 카카오 서버에게 응답받은 Client의 정보로
 * Client에게 우리 서버 인증에 필요한 JWT 발급
 */
export const KakaoCallback = async (req: any, res: any) => {
  const REDIRECT_URL = 'http://localhost:3000/Login/KakaoCallback';
  const { code, state } = req.query;

  try {
    const { access_token } = await KakaoAuth(code)
      .then((res) => res.json())
      .then((result) => result);

    const member = await GetUserData(access_token);
    const userExist = await CheckExistUserById(member.id);
    const jwt = CreateToken(member);
    member.refresh_token = CreateRefreshToken(member.id);

    /** 카카오톡 프로필 사진 바뀌었을때 고민해야함 (21-08-25:지성현) */
    if (userExist) {
      UpdateRefreshTokenToMember(member.id, member.refresh_token);
    } else {
      SaveMember(member);
    }
    ``;

    return await res.redirect(`${REDIRECT_URL}/?jwt=${jwt}`);
  } catch (err) {
    console.log(`state: ${state}`);
    throw new Error(err);
  }
};