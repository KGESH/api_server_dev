import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import { schemaWithResolvers } from '@src/graphql/SchemaBuilder';
import { graphqlUploadExpress } from 'graphql-upload';
import { MongoDB } from '@db/MongoDB';
import { KakaoCallback } from '@auth/kakao/KakaoCallback';
import { AuthContext } from '@auth/middle-ware/AuthContext';
import http from 'http';
import logger from 'morgan';

export const API_SERVER_URL =
  process.env.API_SERVER_URL || `https://api-server-rstrcjinfq-du.a.run.app`;
export const FRONT_WEB_URL =
  process.env.FRONT_WEB_URL || `https://collabo-front-rstrcjinfq-du.a.run.app`;
export const DeployServer = async () => {
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

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4010 }, () => {
      console.log(`서버구동🚀🚀🚀 ${process.env.API_SERVER_URL}`);
      console.log(`run graphql server path: ${server.graphqlPath}:${process.env.PORT}`);
    }),
  );
  return { server, app };
};
