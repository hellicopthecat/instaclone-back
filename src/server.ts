import dotenv from "dotenv";
dotenv.config();
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {schema} from "./schema";
import {getUser} from "./users/user.utils";
import client from "./client";

const server = new ApolloServer({schema});

startStandaloneServer(server, {
  context: async ({req, res}) => {
    return {
      loginUserToken: await getUser(req.headers.token),
      client,
    };
  },
}).then(() => {
  console.log(`✅ Server is Listen http://localhost:${process.env.PORT}`);
});
