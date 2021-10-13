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

describe('마일리지 통합 테스트', () => {
  describe('마일리지 등록', () => {
    it('마일리지 등록', async () => {

      expect(1).toBe(1);
    });
    it('silver 등급 마일리지 등록', async () => {

      expect(1).toBe(1);
    });
    it('gold 등급 마일리지 등록', async () => {

      expect(1).toBe(1);
    });
    it('vip 등급 마일리지 등록', async () => {

      expect(1).toBe(1);
    });
  });


  describe('마일리지 환불', () => {
    it('마일리지 환불', async () => {

      expect(1).toBe(1);
    });
  });


});
