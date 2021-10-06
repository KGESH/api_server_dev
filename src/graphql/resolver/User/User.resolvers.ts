import { ExistCafeNameInUser, FindAllUser, FindUserById, FindUserByName } from '@db/user/FindUser';
import { SaveCardToUser } from '@db/user/FindAndUpdateUser';
import { VerifyUser } from '@auth/Jwt';
import { UserModel } from '@db/user/UserModel';

export default {
  Query: {
    getAllUser: () => {
      return FindAllUser();
    },

    getUserById: (_: any, { id }: any) => FindUserById(id),

    getUserByName: (_: any, { name }: any) => FindUserByName(name),

    /** 해당 user가 card를 갖고있는지 조회 [params: id, cafe_name] (21-8-23:유성현) */
    existCafeNameInUser: (_: any, { id, cafe_name }: any) => ExistCafeNameInUser(id, cafe_name),
  },
  Mutation: {
    /**
     * 처음 카카오 로그인 할때 호출되는 mutation
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     * (2021-08-20:지성현)
     */
    getKakaoUserByJwt: async (_: any, { jwt }: any) => {
      console.log(`call kakao user jwt : ${jwt}`);
      return await VerifyUser(jwt);
    },

    /**
     * 인증 mutation
     * Client에서 인증 요청 보낼때
     * AuthContext 미들웨어에서 토큰을 검사
     * 토큰이 유효하면 user 정보 넘어옴
     * 유효하지 않으면 undefined 넘어옴
     */
    authUser: async (_: any, __: any, { authUser }: any) => {
      return await authUser;
    },

    /** 해당 id를 가지고있는 user에게 카드 발급 (21-08-20:유성현) */
    saveCardToUser: (_: any, params: any) => SaveCardToUser(params),
    /** 비즈니스 앱 사용자의 상태 판별 조회 (21-10-6:유성현) */ // render 할 때가 아닌 현 시점이므로 Mutation 사용
    getUserState: (_: any, { id }: any) => UserModel.findOne({ id }),

    /** 개발중 - 완료 시 삭제예정 */
    editProfile: async (_: any, { profile }: any) => {
      console.log(`edit profile!`);
      const { nickname, file } = await profile;
      const { filename } = await file;
      console.log(file);
      console.log(`file name : ${filename}`);

      return await true;
    },
  },
};
