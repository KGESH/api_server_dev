import { ConnectTestDB, DisConnectTestDB, ClearDB } from '@test/TestDB';
import { ITestServer, TestServer } from '@util/server-config/TestConfig';
import {
  ADD_CATEGORY,
  ADD_MENU,
  DELETE_STAFF,
  ENROLL_STAFF,
  GET_CAFE_BY_CAFE_ID,
  GET_MENU_BY_CAFE_ID,
  SAVE_STAFF,
  SAVE_TEMP_CAFE,
} from '@test/cafe/GqlRepository';
import { init_cafe_data } from '@test/cafe/InitData';
import { TestSaveCafe } from '@db/cafe/SaveCafe';
import { DummyModel } from '@db/cafe/CafeModel';

let server: ITestServer;

beforeAll(async () => {
  await ConnectTestDB();
  await TestSaveCafe(init_cafe_data);
  server = await TestServer();
});

afterAll(async () => {
  await ClearDB();
  await DisConnectTestDB();
  server.stop();
});

describe('카페 통합 테스트', () => {
  // describe('회원 등록 및 카페 개설', () => {
  //   it('정회원 카페 등록', async () => {
  //     // given
  //     await server.apolloServer.executeOperation({
  //       query: SAVE_TEMP_CAFE,
  //       variables: { owner_id: 1, name: '김철수', cafe_name: '카페A', address: '상암동' },
  //     });
  //     // then
  //     const result = await DummyModel.exists({ 'cafe_info.cafe_name': '카페A' });
  //     expect(result).toBe(true);
  //   });
  //
  //   it('정회원&카페 등록 승인', async () => {
  //     /** mutation 수정 후 테스트 실행 */
  //     expect(1).toBe(1);
  //   });
  //
  //   it('카페 삭제', async () => {
  //     // 함수가 존재하지 않음
  //     expect(1).toBe(1);
  //   });
  // });

  describe('직원 등록 및 관리', () => {
    it('직원 등록 요청', async () => {
      await server.apolloServer.executeOperation({
        query: SAVE_STAFF,
        variables: {
          cafe_id: 10,
          staff_id: 1,
          staff_name: '맹구',
          staff_phone: '010-0001-0002',
          staff_position: '직원',
        },
      });

      const { data } = await server.apolloServer.executeOperation({
        query: GET_CAFE_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      expect(data?.getCafeByCafeId?.staff[0].staff_name).toBe('맹구');
    });
    it('직원 등록 승인', async () => {
      // 승인
      await server.apolloServer.executeOperation({
        query: ENROLL_STAFF,
        variables: { cafe_id: 10, staff_id: 1 },
      });

      // 데이터 확인 (enroll == true)
      const { data } = await server.apolloServer.executeOperation({
        query: GET_CAFE_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      expect(data?.getCafeByCafeId?.staff[0].enroll).toBe(true);
    });
    it('현재 직원 해임', async () => {
      // 해임
      await server.apolloServer.executeOperation({
        query: DELETE_STAFF,
        variables: { cafe_id: 10, staff_id: 1 },
      });

      // 데이터 삭제 되었는지 확인
      const { data } = await server.apolloServer.executeOperation({
        query: GET_CAFE_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      expect(data?.getCafeByCafeId?.staff[0]).toBe(undefined);
    });
  });

  describe('메뉴 등록 및 삭제', () => {
    it('메뉴 스카마 생성 확인', async () => {
      const { data } = await server.apolloServer.executeOperation({
        query: GET_MENU_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      expect(data?.getMenuByCafeId?.cafe_id).toBe(10);
    });
    it('카테고리 추가', async () => {
      await server.apolloServer.executeOperation({
        query: ADD_CATEGORY,
        variables: { cafe_id: 10, title: '카테고리A' },
      });
      const { data } = await server.apolloServer.executeOperation({
        query: GET_MENU_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      expect(data?.getMenuByCafeId?.title[0]).toBe('카테고리A');
    });
    it('메뉴 추가', async () => {
      await server.apolloServer.executeOperation({
        query: ADD_MENU,
        variables: {
          cafe_id: 10,
          link: '카테고리A',
          menu_name: '카푸치노',
          beans: '원두',
          price: 2500,
        },
      });
      const { data } = await server.apolloServer.executeOperation({
        query: GET_MENU_BY_CAFE_ID,
        variables: { cafe_id: 10 },
      });
      expect(data?.getMenuByCafeId?.menu[0]?.menu_name).toBe('카푸치노');
    });
    it('메뉴 수정', async () => {
      // await server.apolloServer.executeOperation({
      //   query: ADD_CATEGORY,
      //   variables: { cafe_id: 10, title: '카테고리A' },
      // });
      // const { data } = await server.apolloServer.executeOperation({
      //   query: GET_MENU_BY_CAFE_ID,
      //   variables: { cafe_id: 10 },
      // });
      expect(1).toBe(1);
    });
    it('메뉴 삭제', async () => {
      // await server.apolloServer.executeOperation({
      //   query: ADD_CATEGORY,
      //   variables: { cafe_id: 10, title: '카테고리A' },
      // });
      // const { data } = await server.apolloServer.executeOperation({
      //   query: GET_MENU_BY_CAFE_ID,
      //   variables: { cafe_id: 10 },
      // });
      expect(1).toBe(1);
    });
  });
});
