import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
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
