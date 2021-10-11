import { ConnectTestDB, DisConnectTestDB, ClearDB } from '@test/TestDB';
import { ITestServer, TestServer } from '@util/server-config/TestConfig';
import { gql } from 'apollo-server-express';
import { FindUserByName } from '@db/user/FindUser';

let server: ITestServer;
const TEST_QUERY = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      name
      email
      id
    }
  }
`;
let start: Date, end: Date, elapsed: Date;

beforeAll(async () => {
  // const user: IUser = {
  //   id: 5555,
  //   name: 'jee',
  //   email: 'fas@asd.com',
  // };

  await ConnectTestDB();
  // await SaveUser(user);
  server = await TestServer();
});

afterAll(async () => {
  await ClearDB();
  await DisConnectTestDB();
  server.stop();
});

describe('카페 통합 테스트', () => {
  describe('회원가입 및 카페등록', () => {
    it('정회원 회원가입', async () => {
      // 단! 최소한의 데이터만 넣고 실행 (아래 작업에서 오류가 발생하는지 확인)
      expect(1).toBe(1);
    });

    it('정회원&카페 등록 승인', async () => {
      expect(1).toBe(1);
    });
  });

  describe('직원 등록 및 관리', () => {
    it('직원 등록 2회 요청', async () => {
      // 요청

      // 데이터 확인(enroll == false)

      expect(1).toBe(1);
    });
    it('직원 등록 거절', async () => {
      // 거절

      // 데이터 삭제 되었는지 확인

      expect(1).toBe(1);
    });
    it('직원 등록 승인', async () => {
      // 승인

      // 데이터 확인 (enroll == true)

      expect(1).toBe(1);
    });
    it('현재 직원 해임', async () => {
      // 해임

      // 데이터 삭제 되었는지 확인

      expect(1).toBe(1);
    });
  });

  describe('매장 정보 수정', () => {
    it('매장 소개 수정', async () => {
      expect(1).toBe(1);
    });
  });

  describe('메뉴 등록 및 삭제', () => {
    it('메뉴 스카마 생성 확인', async () => {
      expect(1).toBe(1);
    });
    it('카테고리 추가', async () => {
      expect(1).toBe(1);
    });
    it('메뉴 추가', async () => {
      expect(1).toBe(1);
    });
    it('메뉴 수정', async () => {
      expect(1).toBe(1);
    });
    it('메뉴 삭제', async () => {
      expect(1).toBe(1);
    });
  });
});
