import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/user.utils';
import client from './client';
import morgan from 'morgan';

const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 1 }),
    cors({
      origin: ['http://localhost:4000/graphql'],
      credentials: true,
      // exposedHeaders: ['Apollo-Require-Preflight', 'x-apollo-operation-name'],
    }),
    morgan('tiny'),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          loginUserToken: await getUser(req.headers.token),
          client,
        };
      },
    }),
  );
  app.use('/static', express.static('uploads'));
});
httpServer.listen({ port: PORT });
console.log(`✅ Server is Listen http://localhost:${PORT}/graphql`);
