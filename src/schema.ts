import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadTypeDefs);
export const resolvers = mergeResolvers(loadResolvers);
