import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/user.utils';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const PORT = process.env.PORT;
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      return { loginUserToken: await getUser(ctx.connectionParams?.token) };
    },
    onConnect: async ({ connectionParams }) => {
      const tokenExists = connectionParams?.token;
      if (!tokenExists) {
        throw new Error('접근할 수 없습니다.');
      }
      const loginUserToken = await getUser(tokenExists);
      return { loginUserToken };
    },
    onDisconnect(ctx, code, reason) {
      return;
    },
  },
  wsServer,
);
const server = new ApolloServer<BaseContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
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
        };
      },
    }),
  );
  app.use('/static', express.static('uploads'));
});

httpServer.listen(PORT, () => {
  console.log(`✅ Server is Listen http://localhost:${PORT}/graphql`);
});
