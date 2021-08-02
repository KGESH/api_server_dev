import { GraphQLServer } from 'graphql-yoga';
import resolvers from '@graphql/resolvers';
import { MongoDB } from '@db/MongoDB';

MongoDB();
const options = {
  port: 4010,
};

export const server = new GraphQLServer({
  typeDefs: 'src/graphql/schema.graphql',
  resolvers,
});

server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`),
);
