import { loadSchemaSync } from '@graphql-tools/load';
import { loadFiles, loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

/** schema, resolver 병합 (21-09-04:지성현)*/
const schema = loadSchemaSync(join(__dirname, './schema/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

//const schemaArray = loadFilesSync(join(__dirname, './schema/**/*.graphql'));
//export const schema = mergeTypeDefs(schemaArray);

const resolverArray = loadFilesSync(join(__dirname, './resolver/**/*.resolvers.*'));
export const resolvers = mergeResolvers(resolverArray);

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
