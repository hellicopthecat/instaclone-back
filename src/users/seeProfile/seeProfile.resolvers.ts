import {Resolvers} from "../../types";

export default {
  Query: {
    user: (_, {userName}, {client}) =>
      client.user.findUnique({where: {userName}}),
  },
} as Resolvers;
