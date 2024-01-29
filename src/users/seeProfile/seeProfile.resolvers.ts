import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    user: async (_, { userName }) =>
      await client.user.findUnique({
        where: { userName },
        include: { following: true, followers: true },
      }),
  },
} as Resolvers;
