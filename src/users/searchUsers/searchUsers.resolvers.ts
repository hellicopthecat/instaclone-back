import { Resolvers } from '../../types';

export default {
  Query: {
    searchUsers: async (_, { keyword }, { client }) => {
      const users = await client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
    },
  },
} as Resolvers;
