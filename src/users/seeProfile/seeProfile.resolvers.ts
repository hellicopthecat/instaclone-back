import { Resolvers } from '../../types';

export default {
  Query: {
    user: (_, { userName }, { client }) =>
      client.user.findUnique({
        where: { userName },
        include: { following: true, followers: true },
      }),
  },
} as Resolvers;
