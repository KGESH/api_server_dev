import { loadSchemaSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

const schema = loadSchemaSync(join(__dirname, './schema/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const resolverArray = loadFilesSync(join(__dirname, './resolver/**/*.resolvers.*'));
export const resolvers = mergeResolvers(resolverArray);

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
