import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ConnectTestDB, DisConnectTestDB, ClearDB } from '@test/TestDB';
import { ITestServer, TestServer } from '@util/server-config/TestConfig';
import { gql } from 'apollo-server-express';
import { IUser } from '@db/user/UserModel';
import { SaveUser } from '@db/user/SaveUser';
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

/** 테스트 시작 전에 돌아가는 코드
 * 테스트 서버 구동
 * 테스트 DB 구동
 * 테스트 DB는 메모리에서 실행
 * 테스트가 끝나면 날아감
 */
beforeAll(async () => {
  const user: IUser = {
    id: 5555,
    name: 'jee',
    email: 'fas@asd.com',
  };

  await ConnectTestDB();
  await SaveUser(user);
  server = await TestServer();
});

/** 테스트가 끝나면 돌아가는 코드
 * 메모리에서 돌아가는 DB 연결 해제
 * 서버 종료
 */
afterAll(async () => {
  await ClearDB();
  await DisConnectTestDB();
  server.stop();
});

describe('This is Test DB Example', () => {
  it('should be find jee', async () => {
    const user: any = await FindUserByName('jee');
    console.log(user);
    expect(user.name).toBe('jee');
  });
});

describe('This is Test Query Example', () => {
  it('should be query jee', async () => {
    const result = await server.apolloServer.executeOperation({
      query: TEST_QUERY,
      variables: { id: 5555 },
    });

    expect(result?.data?.getUserById.name).toBe('jee');
  });
});
