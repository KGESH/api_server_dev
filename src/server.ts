import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import { schemaWithResolvers } from '@graphql/schema';
import { graphqlUploadExpress } from 'graphql-upload';
import { MongoDB } from '@db/MongoDB';
import { KakaoCallback } from '@auth/kakao/KakaoCallback';
import { AuthContext } from '@auth/middle-ware/AuthContext';
import http from 'http';
import logger from 'morgan';

const startServer = async () => {
  MongoDB();
  const app = express();
  /**개발용 미들웨어 - request 로그들 콘솔에 찍어줌 */
  app.use(logger('dev'));
  app.use(graphqlUploadExpress());
  app.get('/auth/kakao/KakaoCallback', KakaoCallback);

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: AuthContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 4010 }, () => console.log(`서버구동🚀🚀🚀 http://localhost:4010/graphql`));
};

startServer();
