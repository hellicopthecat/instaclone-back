import dotenv from "dotenv";
dotenv.config();
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {schema} from "./schema";

const server = new ApolloServer({schema});

startStandaloneServer(server).then(() => {
  console.log(`✅ Server is Listen http://localhost:${process.env.PORT}`);
});
