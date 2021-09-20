import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import { schemaWithResolvers } from '@graphql/schema';
import { graphqlUploadExpress } from 'graphql-upload';
import { KakaoCallback } from '@auth/kakao/KakaoCallback';
import http from 'http';

export class ITestServer {
  apolloServer: ApolloServer<ExpressContext>;
  expressApp: http.Server;

  constructor(apolloServer: ApolloServer<ExpressContext>, expressApp: http.Server) {
    this.apolloServer = apolloServer;
    this.expressApp = expressApp;
  }

  stop() {
    this.expressApp.close();
    this.apolloServer.stop();
  }
}

export const TestServer = async () => {
  const app = express();
  app.use(graphqlUploadExpress());
  app.get('/auth/kakao/KakaoCallback', KakaoCallback);

  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  /** 나중에 테스트용 api들을 만들 때, 테스트용 포트번호도 바꿔줘야할듯함 (21-09-20:지성현) */
  const expressApp = app.listen({ port: 4010 }, () =>
    console.log(`서버구동🚀🚀🚀 http://localhost:4010/graphql`),
  );

  return new ITestServer(apolloServer, expressApp);
};
