import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from '@graphql/resolvers';
import { MongoDB } from '@db/MongoDB';
import { KakaoTokenCallback, KakaoCallback } from '@auth/kakao/KakaoCallback';
import { isAuthenticate } from '@auth/middle-ware/Passport';
MongoDB();
const options = {
  port: 4011,
};

export const server = new GraphQLServer({
  typeDefs: 'src/graphql/schema.graphql',
  resolvers,
  //context: ({ request }) => ({ request, isAuthenticate }),
});

/**
 * 라우팅 구조 변경예정
 */
server.express.get('/hello', (req, res) => {
  console.log('get hello');
  res.send('hello world!');
});
server.express.get('/auth/kakao/KakaoTokenCallback', KakaoTokenCallback);
server.express.get('/auth/kakao/KakaoCallback', KakaoCallback);

server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`),
);
