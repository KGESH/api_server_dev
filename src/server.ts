import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from '@graphql/resolvers';
import { MongoDB } from '@db/MongoDB';
import { KakaoCallback } from '@auth/kakao/KakaoCallback';
import logger from 'morgan';
import { AuthContext } from '@auth/middle-ware/AuthContext';
MongoDB();

const options = {
  port: 4010,
  endpoint: '/graphql',
  playground: '/playground',
};

export const server = new GraphQLServer({
  typeDefs: 'src/graphql/schema.graphql',
  resolvers,
  context: AuthContext,
});

/**
 * 개발용 미들웨어
 * request 로그들 콘솔에 찍어줌
 */
server.express.use(logger('dev'));

/**
 * 라우팅 구조 변경예정
 */
server.express.get('/auth/kakao/KakaoCallback', KakaoCallback);
server.start(options, ({ port }) =>
  console.log(`서버구동🚀🚀🚀 playground: http://localhost:${port}/playground`),
);
