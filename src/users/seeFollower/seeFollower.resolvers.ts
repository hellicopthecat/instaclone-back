import client from '../../client';
import { Resolvers } from '../../types';

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({
          skip: (page - 1) * 5,
          take: 5,
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { userName } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
} as Resolvers;
