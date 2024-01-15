import bcrypt from "bcrypt";
import client from "../client";
import {Resolvers} from "../../types";

const resolver: Resolvers = {
  Query: {
    users: () => client.user.findMany(),
    user: (_, {userName}) => client.user.findFirst({where: {userName}}),
  },
  Mutation: {
    createUser: async (_, {userName, firstName, lastName, email, password}) => {
      const userExists = await client.user.findFirst({
        where: {OR: [{userName}, {email}]},
      });
      const bcryptPw = await bcrypt.hash(password, 10);
      return await client.user.create({
        data: {
          userName,
          firstName,
          lastName,
          email,
          password: bcryptPw,
        },
      });
    },
  },
};

export default resolver;
