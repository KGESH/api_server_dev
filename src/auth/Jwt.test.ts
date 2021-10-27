import { IUser } from '@src/db/user/UserModel';
import { CreateToken, VerifyToken, VerifyUser } from './Jwt';
import { ConnectTestDB, DisConnectTestDB, ClearDB } from '@test/TestDb';
import { SaveUser } from '@db/user/SaveUser';

/** 테스트 시작 전에 돌아가는 코드
 * 테스트 서버 구동
 * 테스트 DB 구동
 * 테스트 DB는 메모리에서 실행
 * 테스트가 끝나면 날아감
 */
beforeAll(async () => {
  const user: IUser = {
    id: 1234,
    name: 'jee',
    email: 'test@test.com',
  };

  await ConnectTestDB();
  await SaveUser(user);
});

/** 테스트가 끝나면 돌아가는 코드
 * 메모리에서 돌아가는 DB 연결 해제
 * 서버 종료
 */
afterAll(async () => {
  await ClearDB();
  await DisConnectTestDB();
});

describe('JWT Test', () => {
  let mockUser: IUser;
  let testJwt: string;

  beforeEach(() => {
    mockUser = { id: 1234, name: 'jee', email: 'test@test.com' };
    testJwt = CreateToken(mockUser);
  });

  it('should be return json web token', () => {
    expect(CreateToken(mockUser)).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/);
  });

  it('should be verify jwt', async () => {
    const result = await VerifyToken(testJwt);
    expect(result.message).toStrictEqual('success');
    expect(result.payload).toMatchObject(mockUser);
  });

  it('should be return user', async () => {
    const { user } = (await VerifyUser(testJwt)) || {};
    expect(user).toMatchObject(mockUser);
  });
});
