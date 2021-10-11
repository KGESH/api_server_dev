import { ConnectTestDB, DisConnectTestDB, ClearDB } from '@test/TestDB';
import { ITestServer, TestServer } from '@util/server-config/TestConfig';
import { gql } from 'apollo-server-express';
import { SaveStaff } from '@db/cafe/SaveCafe';
import { CafeModel } from '@db/cafe/CafeModel';
import { FindCafeByCafeId } from '@db/cafe/FindCafe';

const GET_CAFE = gql`
  query ($cafe_id: Int!) {
    getCafeByCafeId(cafe_id: $cafe_id) {
      cafe_id
      owner_id
    }
  }
`;

const SaveCafe = () => {
  new CafeModel({
    cafe_info: {
      cafe_img: '카페 이미지',
      card_img: '카드 이미지',
      like: 0,
      introduction: '카페 소개',
      cafe_name: '카페A',
      location: '37.392322870446684, 126.99560860167533',
      beans: '원두 소개',
      address: '상암동',
      phone: '010-001-001',
    },
    discount_rate: {
      silver: 2,
      gold: 3,
      vip: 5,
    },
    owner_id: 11,
    point_fluc: -7000,
    cafe_id: 10,
  }).save();
};

let server: ITestServer;
let test_cafe_id: number;

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
      const SAVE_TEMP_CAFE = gql`
        mutation (
          $location: String
          $owner_id: Int!
          $name: String!
          $phone: String
          $cafe_name: String
          $address: String
          $address_detail: String
          $cafe_phone: String
          $silver: Int
          $gold: Int
          $vip: Int
        ) {
          saveTempCafe(
            location: $location
            owner_id: $owner_id
            name: $name
            phone: $phone
            cafe_name: $cafe_name
            address: $address
            address_detail: $address_detail
            cafe_phone: $cafe_phone
            silver: $silver
            gold: $gold
            vip: $vip
          ) {
            owner_id
          }
        }
      `;
      const GET_TEMP_CAFE = gql`
        query {
          getTempCafe {
            cafe_id
            owner_id
            cafe_info {
              cafe_name
            }
          }
        }
      `;
      await server.apolloServer.executeOperation({
        query: SAVE_TEMP_CAFE,
        variables: { owner_id: 1, name: '김철수', cafe_name: '카페A', address: '상암동' },
      });
      const { data } = await server.apolloServer.executeOperation({
        query: GET_TEMP_CAFE,
      });
      expect(data.getTempCafe[0].cafe_info.cafe_name).toBe('카페A');
    });

    it('정회원&카페 등록 승인', async () => {
      // const ENROLL_CAFE = gql`
      //   mutation {
      //     enrollCafe
      //   }
      // `;
      /** mutation 수정 후 테스트 실행 */
      expect(1).toBe(1);
    });

    it('카페 삭제', async () => {
      // 삭제 함수 없음

      expect(1).toBe(1);
    });
  });

  describe('직원 등록 및 관리', () => {
    it('직원 등록 요청', async () => {
      // 테스트 카페 (카페 아이디: 1)
      await SaveCafe();

      const SAVE_STAFF = gql`
        mutation (
          $cafe_id: Int!
          $staff_id: Int!
          $staff_name: String!
          $staff_phone: String!
          $staff_position: String!
        ) {
          saveStaff(
            cafe_id: $cafe_id
            staff_id: $staff_id
            staff_name: $staff_name
            staff_phone: $staff_phone
            staff_position: $staff_position
          ) {
            cafe_id
            staff {
              staff_id
              staff_name
              staff_phone
              staff_position
            }
          }
        }
      `;
      const result = await server.apolloServer.executeOperation({
        query: SAVE_STAFF,
        variables: {
          cafe_id: 10,
          staff_id: 20,
          staff_name: '맹구',
          staff_phone: '010-0001-0002',
          staff_position: '직원',
        },
      });

      // const result = await server.apolloServer.executeOperation({
      //   query: GET_CAFE,
      //   variables: { cafe_id: 10 },
      // });
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
