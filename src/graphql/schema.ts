import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { resolvers } from '@graphql/resolvers';
import { join } from 'path';

/** schema, resolver 병합 (21-09-04:지성현)*/
const schema = loadSchemaSync(join(__dirname, './schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
