import { ConnectTestDB, DisConnectTestDB, ClearDB } from '@test/TestDB';
import { ITestServer, TestServer } from '@util/server-config/TestConfig';
import {GET_CAFE_BY_CAFE_ID, GET_TEMP_CAFES, SAVE_STAFF, SAVE_TEMP_CAFE} from "@test/cafe/GqlRepository";
import {SaveCafe} from "@test/cafe/InitData";


let server: ITestServer;

beforeAll(async () => {
  await ConnectTestDB();
  server = await TestServer();
});

afterAll(async () => {
  await ClearDB();
  await DisConnectTestDB();
  server.stop();
});

describe('카페 통합 테스트', () => {
  describe('회원 등록 및 카페 개설', () => {
    it('정회원 카페 등록', async () => {
      await server.apolloServer.executeOperation({
        query: SAVE_TEMP_CAFE,
        variables: { owner_id: 1, name: '김철수', cafe_name: '카페A', address: '상암동' },
      });
      const { data } = await server.apolloServer.executeOperation({
        query: GET_TEMP_CAFES,
      });
      expect(data.getTempCafe[0].cafe_info.cafe_name).toBe('카페A');
    });

    it('정회원&카페 등록 승인', async () => {
      /** mutation 수정 후 테스트 실행 */
      expect(1).toBe(1);
    });

    it('카페 삭제', async () => {
      // 함수가 존재하지 않음
      expect(1).toBe(1);
    });
  });

  describe('직원 등록 및 관리', () => {
    it('직원 등록 요청', async () => {
      // 테스트 카페 (카페 아이디: 1)
      await SaveCafe();
      await server.apolloServer.executeOperation({
        query: SAVE_STAFF,
        variables: {
          cafe_id: 10,
          staff_id: 20,
          staff_name: '맹구',
          staff_phone: '010-0001-0002',
          staff_position: '직원',
        },
      });

      const result = await server.apolloServer.executeOperation({
        query: GET_CAFE_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      console.log('result = ' + result);
      expect('맹구').toBe('맹구');
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
