import { FindAllMembers, FindMemberById } from '@db/member/FindMember';
import { FindOrSaveMember, SaveMember } from '@db/member/SaveMember';

export default {
  Query: {
    getAllMembers: () => FindAllMembers(),
    getMemberById: (_: any, { id }: any) => FindMemberById(id),
  },
  Mutation: {
    /**
     * 처음 카카오 로그인 할때 호출되는 mutation
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     * (2021-08-20:지성현)
     */
    // getKakaoUserByJwt: async (_: any, { jwt }: any) => {
    //   console.log(`call kakao user jwt : ${jwt}`);
    //   return await VerifyUser(jwt);
    // },

    /**
     * 인증 mutation
     * Client에서 인증 요청 보낼때
     * AuthContext 미들웨어에서 토큰을 검사
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     */
    // authUser: async (_: any, __: any, { authUser }: any) => {
    //   return await authUser;
    // },

    /** 비즈니스 앱 사용자의 상태 판별 조회 (21-10-6:유성현) */ // render 할 때가 아닌 현 시점이므로 Mutation 사용
    getMemberByIdForMutation: (_: any, { id }: any) => FindMemberById(id),
    getMemberOrSaveMember: (_: any, params: any) => FindOrSaveMember(params),
    saveMember: (_: any, params: any) => SaveMember(params),

    authMember: async (_: any, __: any, { authMember }: any) => {
      return await authMember;
    },
  },
};
