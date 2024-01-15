import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeResolvers, mergeTypeDefs} from "@graphql-tools/merge";
import {makeExecutableSchema} from "@graphql-tools/schema";

const loadTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs = mergeTypeDefs(loadTypeDefs);
const resolvers = mergeResolvers(loadResolvers);

export const schema = makeExecutableSchema({typeDefs, resolvers});
